import { Blogs } from "../models/blogs.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

// ======================= CREATE BLOG =======================
export const createBlog = async (req, res) => {
  try {
    // 1️⃣ Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "User must be logged in" });
    }

    // 2️⃣ Check if file is provided
    const blogImage = req.files?.blogImage; // match frontend field name
    if (!blogImage) {
      return res.status(400).json({ message: "Blog image is required" });
    }

    // 3️⃣ Validate file type
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only JPG, PNG, and WEBP are allowed",
      });
    }

    // 4️⃣ Validate other fields
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "Title, category & about are required" });
    }

    // 5️⃣ Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      { folder: "blog_images" }
    );

    // 6️⃣ Create blog
    const blogData = {
      title,
      about,
      category,
      adminName: req.user.name,
      adminPhoto: req.user.photo,
      createdBy: req.user._id,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url || cloudinaryResponse.url,
      },
    };

    const blog = await Blogs.create(blogData);

    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while creating blog" });
  }
};

// ======================= DELETE BLOG =======================
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return res.status(500).json({ message: "Server error while deleting blog" });
  }
};

// ======================= GET ALL BLOGS =======================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Blogs fetched successfully",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Get All Blogs Error:", error);
    return res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

// ======================= GET SINGLE BLOG =======================
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Get Single Blog Error:", error);
    return res.status(500).json({ message: "Server error while fetching blog" });
  }
};

// ======================= GET MY BLOGS =======================
export const getMyBlogs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User must be logged in" });
    }

    const adminId = req.user._id;
    const blogs = await Blogs.find({ createdBy: adminId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs: blogs || [],
    });
  } catch (error) {
    console.error("Get My Blogs Error:", error);
    return res.status(500).json({ message: "Server error while fetching admin blogs" });
  }
};

// ======================= UPDATE BLOG =======================
export const updateBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User must be logged in" });
    }

    const blogId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Only creator can update
    if (!blog.createdBy || blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to update this blog" });
    }

    const { title, category, about } = req.body;
    
    // Validate required fields
    if (!title && !category && !about && !req.files?.blogImage) {
      return res.status(400).json({ message: "Please provide at least one field to update" });
    }

    let updatedData = {};
    
    if (title) updatedData.title = title;
    if (category) updatedData.category = category;
    if (about) updatedData.about = about;

    // Handle image update if a new image is provided
    if (req.files?.blogImage) {
      const blogImage = req.files.blogImage;
      
      // Validate file type
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({
          message: "Invalid image format. Only JPG, PNG, and WEBP are allowed",
        });
      }

      // Delete old image from Cloudinary if it exists
      if (blog.blogImage?.public_id) {
        try {
          await cloudinary.uploader.destroy(blog.blogImage.public_id);
        } catch (err) {
          console.warn("Failed to delete old image from Cloudinary:", err);
        }
      }

      // Upload new image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        blogImage.tempFilePath,
        { folder: "blog_images" }
      );

      updatedData.blogImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url || cloudinaryResponse.url,
      };
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(blogId, updatedData, { new: true });

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    return res.status(500).json({ message: "Server error while updating blog" });
  }
};
