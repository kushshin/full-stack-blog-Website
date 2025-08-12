import { Router } from "express";
import {createPost,AllPost,SinglePost,deletePost,AddComments, DeleteComments, updatePost} from '../Controllers/postController.js'
import {validationMiddleware} from '../Middlewares/validationMiddleware.js'
import upload from '../Utils/ImageUploadMulter.js'
const router = Router()



router.post('/createPost',upload.single("image"),validationMiddleware,createPost)
router.put('/updatePost/:id',upload.single("image"),validationMiddleware,updatePost)
router.get('/AllPost',AllPost)
router.get('/singlePost/:id',SinglePost)
router.post('/addComment/:id',validationMiddleware,AddComments)
router.delete('/deletePost/:id',validationMiddleware,deletePost)
router.delete('/:postId/deleteComment/:commentId',validationMiddleware,DeleteComments)

export default router