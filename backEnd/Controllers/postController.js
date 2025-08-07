import express from 'express'
import PostModel from '../Models/PostModel.js'
import multer from 'multer';
import ErrorResponse from '../Middlewares/ErrorResponse.js';


//create post

const createPost = async(req,res)=>{
    try {
        const newPost = new PostModel({
            title: req.body.title,
            desc : req.body.desc,
            image:req.file.originalname,
            username: req.body.username,
            postedBy: req.body.user
        })
        await newPost.save()
        res.status(200).json(newPost)
        
    } catch (error) {
        res.status(500).json("internal server error")
    }
}

export{createPost}