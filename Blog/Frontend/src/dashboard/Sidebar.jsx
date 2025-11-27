import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false); // Close sidebar on mobile after selecting
  };

  const gotoHome = () => {
    navigateTo("/");
    setShow(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      setShow(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div
        className="sm:hidden fixed top-20 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-3xl text-gray-800 cursor-pointer hover:text-blue-600" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {show && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setShow(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-64 h-screen shadow-lg fixed top-16 left-0 bg-gradient-to-b from-gray-900 to-gray-800 transition-transform duration-300 z-40 ${
          show ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {/* Close Button Mobile */}
        <div
          className="sm:hidden absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-red-400"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt />
        </div>

        {/* User Profile Section */}
        <div className="p-6 text-center border-b border-gray-700 mt-4 sm:mt-0">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-blue-500"
            src={profile?.user?.photo?.url}
            alt={profile?.user?.name}
          />
          <p className="text-lg font-semibold text-white">{profile?.user?.name}</p>
          <p className="text-xs text-gray-400">{profile?.user?.role}</p>
        </div>

        {/* Menu Items */}
        <ul className="space-y-3 p-4">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 text-sm"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 text-sm"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300 text-sm"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300 text-sm"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 text-sm"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;