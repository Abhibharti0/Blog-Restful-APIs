import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  // Safe JSON parser function
  const getAdminPhotoUrl = (adminPhoto) => {
    try {
      if (typeof adminPhoto === "string" && adminPhoto.startsWith("{")) {
        return JSON.parse(adminPhoto)?.url || "https://via.placeholder.com/40";
      }
      return adminPhoto || "https://via.placeholder.com/40";
    } catch (e) {
      return adminPhoto || "https://via.placeholder.com/40";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore All Blogs
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
            Discover amazing stories, insights, and ideas from our community of passionate writers and creators.
          </p>
        </div>

        {/* Blogs Grid */}
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 bg-gray-200">
                  <img
                    src={blog?.blogImage?.url}
                    alt={blog?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {blog?.category || "Blog"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog?.title || "Untitled Blog"}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {blog?.about || "Check out this amazing blog post..."}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                    <img
                      src={getAdminPhotoUrl(blog?.adminPhoto)}
                      alt={blog?.adminName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {blog?.adminName || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="mb-4 text-6xl">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Blogs Yet</h3>
              <p className="text-gray-600 mb-6">We're working on bringing you amazing content soon. Check back later!</p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;