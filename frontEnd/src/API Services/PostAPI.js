import axios from 'axios';

const API = axios.create({
    // baseURL : import.meta.env.VITE_API_BASE_URL,
    baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

//Post API
export const createPost = (userData)=> API.post("/post/createPost",userData)
export const updatePost = (userData,postId)=> API.patch(`/post/updatePost/${postId}`,userData)
export const AllPost = ()=> API.get("/post/AllPost")
// export const GetUserPosts = (postId)=> API.get(`/post/getuserPosts/${postId}`)
export const AddComments=(commentData,postId)=>API.post(`/post/addComment/${postId}`,commentData)
export const DeleteComments=(postId,commentId)=>API.delete(`/post/${postId}/deleteComment/${commentId}`)
export const UpdatedComments=(postId,commentId,commentData)=>API.patch(`/post/${postId}/updateComment/${commentId}`,commentData)
export const LikePost=(postId)=>API.put(`/post/likePost/${postId}`)
export const DisLikePost=(postId)=>API.put(`/post/dislikePost/${postId}`)
export const DeletePost=(postId)=>API.delete(`/post/deletePost/${postId}`)
export const DeleteSelectedPost=(postId)=>API.delete(`/post/deleteSelectedPost/${postId}`)
export const SinglePost=(postId)=>API.get(`/post/singlePost/${postId}`)
export const HandleViews=(postId)=>API.put(`/post/handleViews/${postId}`)