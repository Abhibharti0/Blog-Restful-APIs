import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaHome, FaBlog, FaUsers, FaInfoCircle, FaEnvelope, FaTachometerAlt, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5000"; // Correct backend URL

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Blogs", path: "/blogs", icon: <FaBlog /> },
    { name: "Creators", path: "/creators", icon: <FaUsers /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];

  const handleLogout = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/api/user/logout`, {
      withCredentials: true,
    });

    // Clear local state
    setIsAuthenticated(false);
    setProfile(null);

    toast.success(data.message);
    navigate("/login");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to logout");
  }
};


  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white hover:scale-105 transition-transform duration-200">
          Cilli<span className="text-yellow-300">Blog</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && profile?.user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-300 text-blue-600 font-semibold rounded hover:bg-yellow-400 transition-all duration-200"
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 border-2 border-white text-white rounded hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-all duration-200"
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition-all duration-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-3xl hover:text-yellow-300 transition-colors duration-200"
          onClick={() => setShow(!show)}
        >
          {show ? <IoCloseSharp /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white bg-opacity-95 backdrop-blur-md px-6 pb-4 space-y-4 shadow-xl transition-all duration-300 ${
          show ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setShow(false)}
            className="flex items-center space-x-3 text-gray-700 text-lg font-medium hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        <div className="pt-4 border-t border-gray-200 space-y-2">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="flex items-center space-x-3 w-full text-gray-700 text-lg py-3 px-3 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setShow(false)}
                className="flex items-center space-x-3 w-full text-blue-600 text-lg py-3 px-3 font-semibold bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200"
              >
                <FaUserPlus />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full text-white text-lg py-3 px-3 font-semibold bg-red-600 hover:bg-red-800 rounded-lg transition-all duration-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
