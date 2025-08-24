import { Router } from "express";
import {createPost,AllPost,SinglePost,deletePost,AddComments, DeleteComments, UpdateComments,updatePost,likePost,dislikePost} from '../Controllers/postController.js'
import {validationMiddleware} from '../Middlewares/validationMiddleware.js'
import upload from '../Utils/ImageUploadMulter.js'
const router = Router()



router.post('/createPost',upload.single("image"),validationMiddleware,createPost)
router.put('/updatePost/:id',upload.single("image"),validationMiddleware,updatePost)
router.get('/AllPost',AllPost)
// router.get('/getuserPosts/:id',getAllUserPosts)
router.get('/singlePost/:id',SinglePost)
router.post('/addComment/:id',validationMiddleware,AddComments)
router.delete('/deletePost/:id',validationMiddleware,deletePost)
router.delete('/:postId/deleteComment/:commentId',validationMiddleware,DeleteComments)
router.patch('/:postId/updateComment/:commentId',validationMiddleware,UpdateComments)
router.put('/likePost/:id',validationMiddleware,likePost)
router.put('/dislikePost/:id',validationMiddleware,dislikePost)

export default router