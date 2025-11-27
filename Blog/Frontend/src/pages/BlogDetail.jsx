import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from "react-icons/fi";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/blogs/singleblog/${id}`,
          { withCredentials: true }
        );
        setBlog(data.blog || data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.response?.data?.message || "Failed to load blog");
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Safe JSON parser for admin photo - handles both object and string formats
  const getAdminPhotoUrl = (adminPhoto) => {
    try {
      // If it's already an object with url property
      if (typeof adminPhoto === "object" && adminPhoto?.url) {
        return adminPhoto.url;
      }
      // If it's a JSON string
      if (typeof adminPhoto === "string" && adminPhoto.startsWith("{")) {
        return JSON.parse(adminPhoto)?.url || "https://via.placeholder.com/50";
      }
      // If it's a plain URL string
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
        month: "long",
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
          <p className="mt-4 text-gray-600 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mt-16">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The blog you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </button>

        {/* Main Blog Container */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          {blog?.blogImage?.url && (
            <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-200">
              <img
                src={blog.blogImage.url}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x400?text=Blog+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
            </div>
          )}

          {/* Blog Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog?.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 border-b border-gray-200 mb-8">
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={getAdminPhotoUrl(blog?.adminPhoto)}
                  alt={blog?.adminName}
                  className="w-12 h-12 rounded-full object-cover bg-gray-200"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/50";
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-800">{blog?.adminName}</p>
                  <p className="text-sm text-gray-500">{blog?.adminRole || "Creator"}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600">
                <FiCalendar className="text-blue-600" />
                <span>{formatDate(blog?.createdAt)}</span>
              </div>

              {/* Category */}
              {blog?.category && (
                <div className="flex items-center gap-2">
                  <FiTag className="text-blue-600" />
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {blog.category}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {blog?.description && (
              <div className="mb-8">
                <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-blue-600 pl-6 py-2 bg-blue-50">
                  {blog.description}
                </p>
              </div>
            )}

            {/* Blog Body - Readable Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                {blog?.about || blog?.blog}
              </div>
            </div>

            {/* Tags */}
            {blog?.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex gap-6 items-start">
                <img
                  src={getAdminPhotoUrl(blog?.adminPhoto)}
                  alt={blog?.adminName}
                  className="w-24 h-24 rounded-full object-cover bg-gray-200 flex-shrink-0"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">About the Author</h3>
                  <p className="text-gray-700 mb-3">{blog?.adminName}</p>
                  <p className="text-gray-600 text-sm">
                    {blog?.adminRole || "Creator"} - Sharing insights and stories with our community.
                  </p>
                  <Link
                    to="/creators"
                    className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    View All Creators →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related/More Blogs CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to explore more?</h3>
          <Link
            to="/blogs"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Read More Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
