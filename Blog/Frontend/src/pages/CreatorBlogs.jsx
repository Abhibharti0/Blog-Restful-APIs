import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiArrowLeft, FiCalendar, FiTag } from "react-icons/fi";

function CreatorBlogs() {
  const { creatorId, creatorName } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreatorBlogs = async () => {
      try {
        setLoading(true);
        
        // Fetch all blogs
        const { data: allBlogsData } = await axios.get(
          "http://localhost:5000/api/blogs/allblogs",
          { withCredentials: true }
        );

        // Filter blogs by creatorId
        const blogsList = allBlogsData.blogs || allBlogsData;
        const creatorBlogsOnly = Array.isArray(blogsList)
          ? blogsList.filter((blog) => blog.createdBy === creatorId)
          : [];

        setBlogs(creatorBlogsOnly);

        // Set creator info
        if (creatorBlogsOnly.length > 0) {
          const firstBlog = creatorBlogsOnly[0];
          setCreatorInfo({
            name: firstBlog.adminName || creatorName || "Creator",
            photo: firstBlog.adminPhoto,
            role: "Content Creator",
          });
        } else {
          setCreatorInfo({
            name: decodeURIComponent(creatorName) || "Creator",
            photo: null,
            role: "Content Creator",
          });
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.response?.data?.message || "Failed to load blogs");
        toast.error("Failed to load creator's blogs");
      } finally {
        setLoading(false);
      }
    };

    if (creatorId) {
      fetchCreatorBlogs();
    }
  }, [creatorId, creatorName]);

  // Safe JSON parser for admin photo
  const getAdminPhotoUrl = (adminPhoto) => {
    try {
      if (typeof adminPhoto === "object" && adminPhoto?.url) {
        return adminPhoto.url;
      }
      if (typeof adminPhoto === "string" && adminPhoto.startsWith("{")) {
        return JSON.parse(adminPhoto)?.url || "https://via.placeholder.com/50";
      }
      if (typeof adminPhoto === "string") {
        return adminPhoto || "https://via.placeholder.com/50";
      }
      return "https://via.placeholder.com/50";
    } catch (e) {
      return "https://via.placeholder.com/50";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/creators")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Creators
        </button>

        {/* Creator Header */}
        {creatorInfo && (
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <div className="flex items-center gap-6">
              <img
                src={getAdminPhotoUrl(creatorInfo.photo)}
                alt={creatorInfo.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover bg-gray-200 border-4 border-blue-600"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/128";
                }}
              />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {creatorInfo.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{creatorInfo.role}</p>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                  {blogs.length} {blogs.length === 1 ? "Blog" : "Blogs"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Grid */}
        {blogs.length > 0 ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Blogs by {creatorInfo?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <a
                  href={`/blog/${blog._id}`}
                  key={blog._id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48 bg-gray-200">
                    <img
                      src={blog?.blogImage?.url}
                      alt={blog?.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Blog+Image";
                      }}
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
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {blog?.title || "Untitled Blog"}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {blog?.about || "Check out this amazing blog post..."}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {formatDate(blog?.createdAt)}
                      </div>
                      {blog?.category && (
                        <div className="flex items-center gap-1">
                          <FiTag className="w-4 h-4" />
                          {blog.category}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6 text-7xl">📝</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                No Blogs Yet
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                {creatorInfo?.name} hasn't created any blogs yet. Check back soon for amazing content!
              </p>
              <button
                onClick={() => navigate("/creators")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Back to Creators
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatorBlogs;
