import express from 'express'
import UserModel from '../Models/UserModel.js';
import ErrorResponse from '../Middlewares/ErrorResponse.js'


const AllUser = async(req,res,next)=>{
    try {
        const allUser = await UserModel.find()
        // console.log({user:allUser})
        if(!allUser) return next(new ErrorResponse('users not found ',400))
            res.status(200).json({success:true,message:"users fetched successsfully", user:allUser})
    } catch (error) {
        next(new ErrorResponse('users not found ',400))
    }
}


const edituserProfile = async (req, res, next) => {
    console.log({ pic: req.body })
    console.log({ pic: req.file })
    try {
        const { username, email } = req.body;
         let updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (req.file) updateData.profilePic = req.file.path;

        const editedUser = await UserModel.findByIdAndUpdate(req.user.id, {
        $set: updateData 
        }, { new: true })
console.log("Post to be saved:", editedUser);
        await editedUser.save()
        res.status(200).json({ success: true, message: "user updated successfully", user: editedUser })
    } catch (error) {
          next(new ErrorResponse("user updation failed",400))
    }
}


const DeleteSingleUser = async(req,res,next)=>{
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id)
          res.status(200).json({ success: true, message: "user deleted successfully",dUser: deletedUser})
    } catch (error) {
        next(new ErrorResponse("failed to delete user",400))
    }
}

const BlockSingleUser = async(req,res,next)=>{
    try {
        const blockedUser = await UserModel.findByIdAndUpdate(req.params.id,{IsBlocked : true},{new:true})
          res.status(200).json({ success: true, message: "user blocked successfully",dUser: blockedUser})
    } catch (error) {
        next(new ErrorResponse("failed to block user",400))
    }
}

const UnBlockSingleUser = async(req,res,next)=>{
    try {
        const unblockedUser = await UserModel.findByIdAndUpdate(req.params.id,{IsBlocked : false},{new:true})
          res.status(200).json({ success: true, message: "user unblocked successfully",dUser: unblockedUser})
    } catch (error) {
        next(new ErrorResponse("failed to block user",400))
    }
}




export { edituserProfile,AllUser,DeleteSingleUser ,BlockSingleUser,UnBlockSingleUser}