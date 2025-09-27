import axios from 'axios';

const API = axios.create({
    baseURL : import.meta.env.REACT_APP_API_BASE,
    // baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

//Auth API
export const AllUsers = ()=>  API.get("/user/allUser")
export const EditUserProfile = (userData)=>  API.patch("/user/editUserProfile",userData)
//Admin API
export const DeleteUser = (userId)=>  API.delete(`/user/deleteUser/${userId}`)
export const BlockUser = (userId)=>  API.put(`/user/blockUser/${userId}`)
export const UnBlockUser = (userId)=>  API.put(`/user/unBlockUser/${userId}`)
