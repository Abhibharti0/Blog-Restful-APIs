import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
      setNewImageSelected(true);
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/blogs/singleblog/${id}`,
          {
            withCredentials: true,
          }
        );
        
        const blogData = data.blog || data;
        console.log("Blog fetched for update:", blogData);
        
        setTitle(blogData?.title || "");
        setCategory(blogData?.category || "");
        setAbout(blogData?.about || "");
        if (blogData?.blogImage?.url) {
          setBlogImage(blogData.blogImage.url);
          setBlogImagePreview(blogData.blogImage.url);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error(error.response?.data?.message || "Failed to load blog for editing");
        navigateTo("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, navigateTo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!title || !category || !about) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    // Always append image if a new one was selected
    if (newImageSelected && blogImage instanceof File) {
      console.log("New image selected, appending to FormData");
      formData.append("blogImage", blogImage);
    } else {
      console.log("No new image selected or image is not a File");
    }

    try {
      setUpdating(true);
      const { data } = await axios.put(
        `http://localhost:5000/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Blog updated:", data);
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/dashboard");
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Failed to update blog";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-12">
      <div className="container mx-auto px-4">
        <section className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Update Blog
            </h1>
            <p className="text-gray-600">Edit and update your blog post</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 bg-white rounded-xl shadow-lg p-8">
            {/* Category */}
            <div>
              <label className="block text-lg font-semibold mb-3">Category *</label>
              <select
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-lg font-semibold mb-3">Blog Title *</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Blog Image */}
            <div>
              <label className="block text-lg font-semibold mb-3">Blog Image</label>
              <div className="mb-4">
                {(blogImagePreview || blogImage) && (
                  <img
                    src={blogImagePreview || blogImage}
                    alt="Blog Preview"
                    className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x400?text=Blog+Image";
                    }}
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition"
                onChange={changePhotoHandler}
              />
              <p className="text-sm text-gray-500 mt-2">Upload a new image to change it</p>
            </div>

            {/* About/Content */}
            <div>
              <label className="block text-lg font-semibold mb-3">Blog Content *</label>
              <textarea
                rows="8"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Write your blog content here (at least 50 characters)"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                {about.length} characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={updating}
                className={`flex-1 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition ${
                  updating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {updating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </span>
                ) : (
                  "Update Blog"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigateTo("/dashboard")}
                className="flex-1 p-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UpdateBlog;
