import axios from 'axios';

const API = axios.create({
    // baseURL : import.meta.env.VITE_API_BASE_URL,
    baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

//Auth API
export const AllUsers = ()=>  API.get("/user/allUser")
export const EditUserProfile = (userData)=>  API.patch("/user/editUserProfile",userData)