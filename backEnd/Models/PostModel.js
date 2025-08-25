import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  views:{
 type:Number,
 default : 0,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    username:String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
  }]
}, { timestamps: true });

const PostModel = mongoose.model('Post', postSchema);
export default PostModel;
