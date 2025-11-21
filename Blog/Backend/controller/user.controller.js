import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../JWT/AuthToken.js";

export const register = async (req, res) => {
  try {
    //  Check if file is provided
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }

    const { photo } = req.files;

    //  Validate file type
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only JPG, PNG, and WEBP are allowed",
      });
    }

    //  Extract and validate user data
    let { email, name, password, phone, education, role } = req.body;

    if (!email || !name || !password || !phone || !education || !role) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    //  Normalize email
    email = email.trim().toLowerCase();

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    //  Upload photo to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "user_photos", // optional folder in Cloudinary
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse?.error);
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url || cloudinaryResponse.url,
      },
    });

    await newUser.save();

    //  Create token and save cookies
    const token = await createTokenAndSaveCookies(newUser._id, res);

    //   Return response
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};



export const login=async(req,res)=>{
  const {email,password,role}=req.body;
  try{
    if(!email||!password||!role)
      return res.status(400).json({message:"Please fill required fields"});

    const user=await User.findOne({email}).select("+password");
  if(!user){
    return res.status(400).json({message:"User password is missing"});
  }

  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
   return res.status(400).json({message:"Invalid email or password"});
  }
  if(user.role!==role){
    return res.status(400).json({message:`given role ${role} not found`})
  }
  const token=await createTokenAndSaveCookies(user._id,res);
  res.status(200).json({message:"user logged in successfully",user:{
    _id:user._id,
    name:user.name,
    email:user.email,
    role:user.role

  },token:token})
  }
  catch(error){
    console.log(error)
    return res.status(500).json({error:"Internal server error"})
  }
}


export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting it to empty and expire immediately
    res.clearCookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), // expire immediately
      secure: process.env.NODE_ENV === "production", // use https in production
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Server error during logout" });
  }
};



export const getmyprofile=async (req,res)=>{
  const user=await req.user;
  res.status(200).json(user);
}


export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
