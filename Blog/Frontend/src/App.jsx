import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import CreatorBlogs from "./pages/CreatorBlogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateBlog from "./dashboard/UpdateBlog";

const App = () => {
  const location = useLocation();

  // Pages where the Navbar should NOT appear
  const hideNavbarRoutes = ["/dashboard", "/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <ErrorBoundary>
      <div>
        {/* Conditionally render Navbar */}
        {!shouldHideNavbar && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path="/blogs" 
            element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/blog/:id" 
            element={
              <ProtectedRoute>
                <BlogDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/blog/update/:id" 
            element={
              <ProtectedRoute>
                <UpdateBlog />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/creator/:creatorId/blogs/:creatorName" 
            element={
              <ProtectedRoute>
                <CreatorBlogs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route 
            path="/contact" 
            element={<Contact />} 
          />
          <Route 
            path="/creators" 
            element={<Creators />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>

        {/* You can also hide footer the same way if needed */}
        {!shouldHideNavbar && <Footer />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
