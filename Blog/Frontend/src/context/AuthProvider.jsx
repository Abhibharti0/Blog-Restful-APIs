import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch profile from backend (cookie-based auth)
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/user/my-profile`, {
          withCredentials: true, // cookie send karega
        });
        const profileData = data.user || data;
        console.log("Profile fetched from my-profile:", profileData);
        setProfile(profileData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
        setIsAuthenticated(false);
      }
    };

    // Fetch all blogs
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/blogs/allblogs`, {
          withCredentials: true,
        });
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  const value = {
    blogs,
    setBlogs,
    profile,
    setProfile,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
