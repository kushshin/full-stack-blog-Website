import { Router } from "express";
import {createPost,AllPost,AddComments, DeleteComments} from '../Controllers/postController.js'
import {validationMiddleware} from '../Middlewares/validationMiddleware.js'
import upload from '../Utils/ImageUploadMulter.js'
const router = Router()



router.post('/createPost',upload.single("image"),validationMiddleware,createPost)
router.get('/AllPost',AllPost)
router.post('/addComment/:id',validationMiddleware,AddComments)
router.delete('/:postId/deleteComment/:commentId',validationMiddleware,DeleteComments)

export default router