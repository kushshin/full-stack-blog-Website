import axios from 'axios';

const API = axios.create({
    // baseURL : import.meta.env.VITE_API_BASE_URL,
    baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

//Auth API
export const registerUser = (userData)=> API.post("/auth/register",userData)
export const loginUser = (userData)=>  API.post("/auth/login",userData)