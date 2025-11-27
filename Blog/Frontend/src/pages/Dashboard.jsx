import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  // Debug logging
  console.log("Dashboard Debug:", { isAuthenticated, profile, adminCheck: profile?.user?.role === "admin" || profile?.role === "admin" });

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || (profile?.user?.role !== "admin" && profile?.role !== "admin")) {
    return <Navigate to="/" />;
  }

  const componentsMap = {
    "My Profile": <MyProfile />,
    "Create Blog": <CreateBlog />,
    "Update Blog": <UpdateBlog />,
    "My Blogs": <MyBlogs />,
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-16 pt-4">
      {/* Sidebar */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main Content */}
      <div className="flex-1 w-full ml-0 sm:ml-64 overflow-auto">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{component}</h1>
            <span className="text-sm md:text-base text-gray-600">Welcome, {profile?.user?.name}</span>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full overflow-x-auto">
            {componentsMap[component]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
