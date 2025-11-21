import express from"express"

import { createBlog ,deleteBlog,getAllBlogs,getSingleBlog,getMyBlogs,updateBlog} from "../controller/blog.controller.js";

import { isAdmin, isAuthentication } from "../middleware/authUser.js";


const router=express.Router()

router.post("/create", isAuthentication,isAdmin("admin"),createBlog)

router.delete("/delete/:id", isAuthentication,isAdmin("admin"),deleteBlog)

router.get("/allblogs", getAllBlogs)

router.get("/singleblog/:id", isAuthentication,getSingleBlog)

router.get("/my-blog", isAuthentication, getMyBlogs);

router.put("/update/:id", isAuthentication, isAdmin("admin"), updateBlog);


export default router;