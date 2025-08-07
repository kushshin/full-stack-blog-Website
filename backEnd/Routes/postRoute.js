import { Router } from "express";
import {createPost} from '../Controllers/postController.js'
import {validationMiddleware} from '../Middlewares/validationMiddleware.js'
import upload from '../Utils/ImageUploadMulter.js'
const router = Router()



router.post('/createPost',validationMiddleware,upload.single("image"),createPost)

export default router