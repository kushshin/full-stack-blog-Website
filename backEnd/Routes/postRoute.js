import { Router } from "express";
import {createPost,AllPost} from '../Controllers/postController.js'
import {validationMiddleware} from '../Middlewares/validationMiddleware.js'
import upload from '../Utils/ImageUploadMulter.js'
const router = Router()



router.post('/createPost',upload.single("image"),validationMiddleware,createPost)
router.get('/AllPost',AllPost)

export default router