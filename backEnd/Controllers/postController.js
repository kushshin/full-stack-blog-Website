import express from 'express'
import PostModel from '../Models/PostModel.js'
import multer from 'multer';
import ErrorResponse from '../Middlewares/ErrorResponse.js';


//create posts

const createPost = async(req,res,next)=>{
    console.log(req.body)
    console.log(req.file)
    const{title,desc,shortDesc,username,categories,postedBy} = req.body

    try {
        const newPost = new PostModel({
            title,
            desc,
            shortDesc,
            image: req.file?.path,
            categories,
            postedBy,
            username,
        })
console.log("Post to be saved:", newPost);
        await newPost.save()
       res.status(200).json({success :true, message : 'new post created', post:newPost})  
    } catch (error) {
         console.error("Save failed:", error);
      next(new ErrorResponse('failed to create post',400))
    }
}

//update post
const updatePost = async(req,res,next)=>{
    const{title,desc,shortDesc,username,category,user} = req.body
    console.log({body:req.body})
    console.log({path:req.file.path})
    
    try {
        const editedPost = await PostModel.findByIdAndUpdate(req.params.id,{
            title,
            desc,
            shortDesc,
            image: req.file?.path,
            categories: category,
            username,
            postedBy: user
        }, { new: true } )
console.log("Post to be saved:", editedPost);
        await editedPost.save()
       res.status(200).json({success :true, message : 'post updated successfully'})  
    } catch (error) {
      next(new ErrorResponse('failed to update post',400))
    }
}

// get all post

const AllPost = async(req,res,next)=>{
    try {
        const allPost = await PostModel.find()
         res.status(200).json({success :true, message : 'fetched All post successfully',post : allPost})  
    } catch (error) {
         next(new ErrorResponse('failed to fetch all posts',400))
    }
}

//get single post

const SinglePost=async(req,res,next)=>{
    console.log({id:req.params.id})
    try {
        const singlepost = await PostModel.findById(req.params.id)
         res.status(200).json({success :true, message : 'fetched All post successfully',post : singlepost})  
    } catch (error) {
         next(new ErrorResponse('failed to fetch all posts',400))
    }
}

// delete Post

const deletePost =async(req,res,next)=>{
    try {
        const post = await PostModel.findById(req.params.id)
        // console.log(post.postedBy)
        if(post.postedBy.toString() === req.user.id){
           await PostModel.findByIdAndDelete(req.params.id)
        }
        res.status(200).json({success:true,message:"post deleted successfully"})
    } catch (error) {
        next(new ErrorResponse("failed to delete the post",400))
    }
}


// add comment
const AddComments = async(req,res,next)=>{
    // console.log(req.body)
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

// delete comment
const DeleteComments = async(req,res,next)=>{
    // console.log({id:req.params})

    try {
         const deleteComment = await PostModel.findByIdAndUpdate(req.params.postId, { $pull: {comments:{ _id: req.params.commentId } }}, { new: true })
         res.status(200).json({success:true, message:"commented deleted successfully", comment: deleteComment})
    } catch (error) {
        next(new ErrorResponse('failed to delete comment',500))
    }
}

// like post
const likePost =async(req,res,next)=>{
console.log(req.params)
    try {
        const post = await PostModel.findById(req.params.id)
        console.log(post)
        if(!post){
            return next(new ErrorResponse("post not found", 400))
        }
      if (post.likes.includes(req.user.id)) {
            return res.status(400).json({ success: false, message: "You already liked this post" });
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $push: {likes: req.user.id } }, // prevents duplicates
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Post liked",
            likedPost: updatedPost
        });
    } catch (error) {
         next(new ErrorResponse('failed to like post',500))
    }
}
// dislike post
const dislikePost =async(req,res,next)=>{
    console.log(req.params)
    try {
        // const post = await PostModel.findById(req.params.postId)
        const Post = await PostModel.findByIdAndUpdate(req.params.id,{$pull:{likes : req.user.id}},{new:true})
         res.status(200).json({success:true, message:" post disliked", dislikedPost: Post})
    } catch (error) {
         next(new ErrorResponse('failed to like post',500))
    }
}

export{createPost,updatePost,AllPost,SinglePost,deletePost,AddComments,DeleteComments,likePost,dislikePost}
