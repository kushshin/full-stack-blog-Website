
import { Router } from "express";
import {AllUser, edituserProfile,DeleteSingleUser,BlockSingleUser,UnBlockSingleUser} from '../Controllers/userController.js'
import {validationMiddleware} from '../Middlewares/validationMiddleware.js'
import { adminValidationMiddleware } from "../Middlewares/validationMiddleware.js";
import upload from '../Utils/ImageUploadMulter.js'
const router = Router()


router.get('/allUser',AllUser)
router.patch('/editUserProfile',upload.single("profilePic"),validationMiddleware,edituserProfile)
router.delete('/deleteUser/:id',adminValidationMiddleware,DeleteSingleUser)
router.put('/blockUser/:id',adminValidationMiddleware,BlockSingleUser)
router.put('/unBlockUser/:id',adminValidationMiddleware,UnBlockSingleUser)

export default router