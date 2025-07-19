import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Base_url from '../../config';

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  maxWidth: '800px',
  margin: 'auto',
  overflow: 'visible',
  background: 'linear-gradient(145deg, #ffffff, #f5f7fa)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px 24px',
  fontWeight: '600',
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[3],
  },
  transition: 'all 0.3s ease',
}));

const AddSeoContent = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const token = localStorage.getItem('authToken');

  const metaTitle = watch('metaTitle', '');
  const metaDescription = watch('metaDescription', '');

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(`https://seohotel.onrender.com/seo/meta/add`, {
        page: data.page,
        category: data.category,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords.split(',').map(k => k.trim())
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
console.log("response",response);
      toast.success('SEO content saved successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save SEO content');
    } finally {
      setLoading(false);
    }
  };

  return (
   
      <CardContent sx={{ p: 4 }}>
        <ToastContainer />
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 1
          }}>
            SEO Content Manager
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Optimize your pages for maximum search engine visibility
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Page URL"
                variant="outlined"
                {...register("page", { required: "Required" })}
                error={!!errors.page}
                helperText={errors.page?.message}
                placeholder="/category/google-ads"
                InputProps={{
                  sx: { borderRadius: '12px' }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  defaultValue=""
                  {...register("category", { required: "Required" })}
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="category">Category</MenuItem>
                  <MenuItem value="product">Product</MenuItem>
                  <MenuItem value="service">Service</MenuItem>
                  <MenuItem value="blog">Blog</MenuItem>
                  <MenuItem value="landing">Landing Page</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                variant="outlined"
                {...register("metaTitle", { required: "Required" })}
                error={!!errors.metaTitle}
                helperText={errors.metaTitle?.message || `${metaTitle.length} characters`}
                InputProps={{
                  endAdornment: (
                    <Chip
                      label={`${metaTitle.length} chars`}
                      size="small"
                      color="default"
                    />
                  ),
                  sx: { borderRadius: '12px' }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Description"
                variant="outlined"
                multiline
                rows={4}
                {...register("metaDescription", { required: "Required" })}
                error={!!errors.metaDescription}
                helperText={errors.metaDescription?.message || `${metaDescription.length} characters`}
                InputProps={{
                  endAdornment: (
                    <Chip
                      label={`${metaDescription.length} chars`}
                      size="small"
                      color="default"
                      sx={{ position: 'absolute', right: 16, bottom: 16 }}
                    />
                  ),
                  sx: { borderRadius: '12px' }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Keywords (comma separated)"
                variant="outlined"
                multiline
                rows={2}
                {...register("metaKeywords", { required: "Required" })}
                error={!!errors.metaKeywords}
                helperText={errors.metaKeywords?.message}
                placeholder="google ads, ppc, digital marketing"
                InputProps={{
                  sx: { borderRadius: '12px' }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{ minWidth: '180px' }}
                >
                  {loading ? 'Saving...' : 'Save SEO Content'}
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    
  );
};

export default AddSeoContent;
