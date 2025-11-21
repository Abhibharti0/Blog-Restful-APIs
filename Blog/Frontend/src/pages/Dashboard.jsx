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

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const componentsMap = {
    "My Profile": <MyProfile />,
    "Create Blog": <CreateBlog />,
    "Update Blog": <UpdateBlog />,
    "My Blogs": <MyBlogs />,
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Optional header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{component}</h1>
          <span className="text-gray-600">Welcome, {profile?.user?.name}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {componentsMap[component]}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
