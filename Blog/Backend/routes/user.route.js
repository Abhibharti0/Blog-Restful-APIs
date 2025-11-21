import express from"express"
import { logout,login,register,getmyprofile, getAdmins } from "../controller/user.controller.js";
import { isAuthentication } from "../middleware/authUser.js";


const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",isAuthentication,logout)
router.get("/my-profile",isAuthentication, getmyprofile)
router.get("/admins",getAdmins)

export default router;