import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base_url from '../../config';
import {
  Box,
  Typography,
  Card,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  MenuItem,
  Select,
  Tooltip,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Collapse,
  Alert,
  TextareaAutosize,
  Stack
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
  }
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  borderRadius: '8px'
}));

const SitemapPreview = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.grey[100],
  borderRadius: '12px',
  overflowX: 'auto',
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap'
}));

const SeoContentList = () => {
  // State Management
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [sitemapContent, setSitemapContent] = useState('');
  const [sitemapLoading, setSitemapLoading] = useState(false);
  const [sitemapError, setSitemapError] = useState(null);
  const [showSitemap, setShowSitemap] = useState(false);

  // Fetch SEO Data
  useEffect(() => {
    const GetSeoContent = async () => {
      try {
        setLoading(true);
        const url = `https://seohotel.onrender.com/seo/meta/getallseo`;
        const response = await axios.get(url);
        setSeoData(response.data.data);
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      } finally {
        setLoading(false);
      }
    };
    GetSeoContent();
  }, []);

  // Sitemap Functions
  const handleGenerateSitemap = async () => {
    try {
      setSitemapLoading(true);
      setSitemapError(null);
      const url = `https://seohotel.onrender.com/seo/meta/sitemap.xml`;
      const response = await axios.get(url);
      setSitemapContent(response.data);
      setShowSitemap(true);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      setSitemapError(error.response?.data?.message || "Failed to generate sitemap");
    } finally {
      setSitemapLoading(false);
    }
  };

  const handleDownloadSitemap = () => {
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Table Handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Modal Handlers
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Filter Data
  const filteredData = seoData.filter(item => {
    const matchesSearch = item.metaTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.page.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);
  const categories = [...new Set(seoData.map(item => item.category))];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Sitemap Button */}
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  <Box sx={{ flexGrow: 1 }}>
    <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'primary.main' }}>
      SEO Content Management
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      View and manage all your SEO metadata
    </Typography>
  </Box>
  
  <Button
    variant="contained"
    color="secondary"
    startIcon={<FileDownloadIcon fontSize="small" />}
    onClick={handleGenerateSitemap}
    disabled={sitemapLoading}
    sx={{
      borderRadius: '10px',
      px: 2, // reduced padding
      py: 0.8,
      fontWeight: 500,
      fontSize: '0.85rem',
      textTransform: 'none',
      whiteSpace: 'nowrap', // prevents text wrap
      boxShadow: 'none',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }}
  >
    {sitemapLoading ? 'Generating...' : 'Generate Sitemap'}
  </Button>
</Box>


      {/* Error Alert */}
      {sitemapError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {sitemapError}
        </Alert>
      )}

      {/* Search and Filter */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: '12px', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title or page..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: '12px' }
            }}
          />
          <Select
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            variant="outlined"
            sx={{ minWidth: 150, borderRadius: '12px' }}
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon color="action" />
              </InputAdornment>
            }
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Paper>

      {/* Sitemap Preview */}
      <Collapse in={showSitemap && !!sitemapContent}>
        <SitemapPreview elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Sitemap XML
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleGenerateSitemap}
                disabled={sitemapLoading}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                onClick={handleDownloadSitemap}
              >
                Download
              </Button>
            </Stack>
          </Box>
          <TextareaAutosize
            minRows={10}
            maxRows={20}
            value={sitemapContent}
            readOnly
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontFamily: 'monospace',
              backgroundColor: 'transparent'
            }}
          />
        </SitemapPreview>
      </Collapse>

      {/* SEO Content Table */}
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={120} sx={{ borderRadius: '16px' }} />
          ))}
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '12px', mb: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'background.default' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Page</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Meta Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Keywords</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRow 
                    key={item._id} 
                    hover 
                    onClick={() => handleOpenModal(item)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                        {item.page}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.metaTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.metaDescription.substring(0, 60)}...
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip 
                        label={item.category} 
                        color={item.category === 'blog' ? 'primary' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {item.metaKeywords.slice(0, 3).map((keyword, idx) => (
                          <Chip key={idx} label={keyword} size="small" />
                        ))}
                        {item.metaKeywords.length > 3 && (
                          <Chip label={`+${item.metaKeywords.length - 3}`} size="small" />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton size="small" color="primary">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ 
              '& .MuiTablePagination-toolbar': {
                justifyContent: 'flex-end'
              }
            }}
          />
        </>
      )}

      {/* Detail View Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            SEO Content Details
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Page URL
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedItem.page}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Category
                </Typography>
                <StatusChip 
                  label={selectedItem.category} 
                  color={selectedItem.category === 'blog' ? 'primary' : 'secondary'}
                  sx={{ mt: 1 }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Meta Title
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {selectedItem.metaTitle}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Meta Description
                </Typography>
                <Typography variant="body1">
                  {selectedItem.metaDescription}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Keywords
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {selectedItem.metaKeywords.map((keyword, idx) => (
                    <Chip key={idx} label={keyword} />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(selectedItem.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SeoContentList;
