import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import {v2 as cloudinary} from 'cloudinary'
import cookieParser from 'cookie-parser';
import cors from 'cors'; 


import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blogs.route.js"

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT",'DELETE']
}));



const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}))

// DB CONNECT
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);  // ⬅️ Removed deprecated options

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

connectDB();

// Defining routes
app.use("/api/user", userRoute);
app.use("/api/blogs", blogRoute);

//CLOUDINARY
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_SECRET_KEY
});
app.get('/', (req, res) => {
  res.send('Hello World! d');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
