import express from 'express'
import PostModel from '../Models/PostModel.js'
import multer from 'multer';
import ErrorResponse from '../Middlewares/ErrorResponse.js';


//create post

const createPost = async(req,res,next)=>{
    const{title,desc,shortDesc,username,category,user} = req.body
    console.log(req.body)
    console.log(req.file.path)
    
    try {
        const newPost = new PostModel({
            title,
            desc,
            shortDesc,
            image: req.file?.path,
            categories: category,
            username,
            postedBy: user
        })
console.log("Post to be saved:", newPost);
        await newPost.save()
       res.status(200).json({success :true, message : 'new post created'})  
    } catch (error) {
      next(ErrorResponse('failed to create post',400))
    }
}

// get all post

const AllPost = async(req,res,next)=>{
    try {
        const allPost = await PostModel.find()
         res.status(200).json({success :true, message : 'fetched All post successfully',post : allPost})  
    } catch (error) {
         next(ErrorResponse('failed to fetch all posts',400))
    }
}

const AddComments = async(req,res,next)=>{
    console.log(req.body)
    const comment = {
        text: req.body.text,
        username: req.body.username,
        user:req.body.user
    }
    try {
         const addComment = await PostModel.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true })
         res.status(200).json({success:true, message:"commented successfully", comment:addComment})
    } catch (error) {
        next(new ErrorResponse('failed to post comment',500))
    }
}


const DeleteComments = async(req,res,next)=>{
    console.log({id:req.params})

    try {
         const deleteComment = await PostModel.findByIdAndUpdate(req.params.postId, { $pull: {comments:{ _id: req.params.commentId } }}, { new: true })
         res.status(200).json({success:true, message:"commented deleted successfully", comment: deleteComment})
    } catch (error) {
        next(new ErrorResponse('failed to delete comment',500))
    }
}

export{createPost,AllPost,AddComments,DeleteComments}
