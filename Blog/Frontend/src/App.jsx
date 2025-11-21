import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from './context/AuthProvider';

const App = () => {
  const location = useLocation();

  // Pages where the Navbar should NOT appear
  const hideNavbarRoutes = ["/dashboard", "/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);


  const {blogs}=useAuth()
  console.log(blogs)
  return (
    <div>
      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* You can also hide footer the same way if needed */}
      {!shouldHideNavbar && <Footer />}
    </div>
  );
};

export default App;
