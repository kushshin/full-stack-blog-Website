import express from 'express'
import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../Middlewares/ErrorResponse.js'
import nodemailer from 'nodemailer'

const registerUser = async(req,res,next)=>{
    console.log(req.body)
    try {
        const{username,email,password} = req.body
        if (!username || !email || !password) {
      return next (new ErrorResponse( 'All fields are required',400 ))
    }

        const user = await UserModel.findOne({username:username})
        if(user){  return next (new ErrorResponse( 'user already exists',401 ))}

            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new UserModel({
                username : username,
                email : email,
                password : hashedPassword
            })

            const savedUser = await newUser.save()
            console.log(savedUser)
            res.status(200).json({success :true, message : 'user registered successfully!! please login',user : savedUser})
            
        } catch (error) {      
               return next (new ErrorResponse( 'user registration failed',400 ))
    }

}

const loginUser = async(req,res,next)=>{
    console.log(req.body)
    try {
        const{email,password} = req.body
         if (!email || !password) {
      return next (new ErrorResponse( 'Email and password required',400 ))
    }
        // console.log(req.body)
        const user = await UserModel.findOne({email:email})
        // console.log(user)
    
    if (!user || user.role !== 'user'){
      return next(new ErrorResponse('user not found',401))
    }
        const isValidPassword = await bcrypt.compare(password ,user.password)
    
        if(!isValidPassword) {
      return next(new ErrorResponse('Invalid Email and password',500))
    }
    
            const token = jwt.sign({id : user._id, email : user.email, role: user.role, username : user.username},process.env.SECRET_KEY)
    
            // res.cookie("Token",token)
            res.cookie("Token",token)
            res.status(200).json({userid : user._id , username : user.username, email : user.email , role : user.role,IsBlocked : user.IsBlocked,success :true, message : 'user loggedIn successfully!! '})
    } catch (error) {
        return next (new ErrorResponse( 'user login failed',400 ))
    }
}

const adminLogin = async(req,res,next)=>{
    console.log(req.body)
    try {
        const{email,password} = req.body
         if (!email || !password){
      return next(new ErrorResponse('Email and password required',400))
    }
        // console.log(req.body)
        const user = await UserModel.findOne({email:email})
        // console.log(user)
    
    if (!user || user.role !== 'admin'){
      return next(new ErrorResponse('user not found',401))
    }
    
        const isValidPassword = await bcrypt.compare(password ,user.password)
    
        if(!isValidPassword) {
      return next(new ErrorResponse('Invalid email and password',500))
    }
    
            const admintoken = jwt.sign({id : user._id, email : user.email, role: user.role, username : user.username},process.env.ADMIN_SECRET_KEY)
    
            // res.cookie("Token",token)
            res.cookie("adminToken",admintoken)
            res.status(200).json({userid : user._id , username : user.username, email : user.email , role : user.role,success :true, message : 'admin loggedIn successfully!! '})
    } catch (error) {
      return next(new ErrorResponse('admin login failed',500))
    }
}

// /routes/authRoute.js

const forgotPassword = async (req, res,next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "15m" });

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  // Send email (basic setup)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    html: `<a href="${resetLink}">Click here to reset password</a>`,
  });

  res.json({ msg: "Reset link sent on your email" });
};



const resetPassword = async (req, res,next) => {
  // console.log(req.params)
  // console.log(req.body)
  // const { token } = req.params;
  const { newPassword } = req.body;
  // console.log(newPassword)
  const authHeader = req.headers.authorization;
// console.log(authHeader)
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({error : 'no token provided'})
  }

  const token = authHeader.split(' ')[1]
  // console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    // console.log(user)

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};



// const Dashboard = (req, res) => {
//     // console.log(req.params.id)
//     // console.log({user : req.usr.id}e)
//     const userdetails =  req.user
//     // console.log({u :userdetails})
//     if(req.user.id === req.params.id) {
//         res.status(200).json({ message: "accessed protected route", username: userdetails.username, email: userdetails.email , role : userdetails.role })
//     } else {
//         res.status(403).json({ message: "not allowed to enter" })
//     }
// }



export {registerUser,loginUser,adminLogin,forgotPassword,resetPassword}