import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
     IsBlocked :{
    type:Boolean,
    default: false

    },
    role: {
        type: String,
         enum:['user','admin'],
        default: "user",
    },
},
    {
        timestamps: true
    })
  
    const UserModel = mongoose.model ('User',userSchema)
    export default UserModel