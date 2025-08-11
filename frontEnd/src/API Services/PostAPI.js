import axios from 'axios';

const API = axios.create({
    // baseURL : import.meta.env.VITE_API_BASE_URL,
    baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

//Post API
export const createPost = (userData)=> API.post("/post/createPost",userData)
export const AllPost = ()=> API.get("/post/AllPost")
export const AddComments=(commentData,postId)=>API.post(`/post/addComment/${postId}`,commentData)
export const DeleteComments=(postId,commentId)=>API.delete(`/post/${postId}/deleteComment/${commentId}`)