import { Router } from "express";
import { registerUser,loginUser,adminLogin,forgotPassword,resetPassword } from "../Controllers/authController.js";
// import { Adminlogin } from "../Controllers/adminController.js";
// import {validationMiddleware} from "../MiddleWare/validationMiddleware.js";
const router = Router()


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/adminlogin',adminLogin)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)
// router.post('/reset-password/:token',resetPassword)
// router.get('/Dashboard/:id', validationMiddleware , Dashboard)


export default router