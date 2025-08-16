
import { Router } from "express";
import {AllUser, edituserProfile} from '../Controllers/userController.js'
import {validationMiddleware} from '../Middlewares/validationMiddleware.js'
import upload from '../Utils/ImageUploadMulter.js'
const router = Router()


router.get('/allUser',AllUser)
router.patch('/editUserProfile',upload.single("profilePic"),validationMiddleware,edituserProfile)

export default router