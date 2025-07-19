// components/Allmain.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import AuthRoute from "./AuthRoute.jsx";
import Logout from "./LogOut.jsx";
import AdminDashboard from "../Pages/Admin/AdminDashboard.jsx";
import AddseoContent from '../Pages/Admin/SeoContent/AddSeoConetnt.jsx'
import "./main.css";
import SeoContentList from "../Pages/Admin/SeoContent/SeoContentList.jsx";
// import CreateSiteMap from "../Pages/Admin/SeoContent/CreateSiteMap.jsx";

const Allmain = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const routeToTitle = {
      "/admin/dashboard": "Admin Dashboard",
    };

    const title = routeToTitle[location.pathname];
    setPageTitle(title || "");
  }, [location.pathname]);

  return (
    <>
      <Header />
      <SideBar />
      <main
        id="main"
        className="main"
        style={{ background: "#f9f7f1", minHeight: "100vh" }}
      >
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <AuthRoute>
                <AdminDashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/admin/seo/content"
            element={
              <AuthRoute>
                <AddseoContent />
              </AuthRoute>
            }
          />
          <Route
            path="/admin/seo/allcontent"
            element={
              <AuthRoute>
                <SeoContentList />
              </AuthRoute>
            }
          />
          <Route
            path="/admin/seo/create-sitemap"
            element={
              <AuthRoute>
                {/* <CreateSiteMap /> */}
              </AuthRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </>
  );
};

export default Allmain;
