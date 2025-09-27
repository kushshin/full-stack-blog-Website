import axios from 'axios';

const API = axios.create({
    baseURL : import.meta.env.REACT_APP_API_BASE,
    // baseURL : "http://localhost:3001/api",
    withCredentials:true,
});

//Auth API
export const registerUser = (userData)=> API.post("/auth/register",userData)
export const loginUser = (userData)=>  API.post("/auth/login",userData)
export const adminLogin = (userData)=>  API.post("/auth/adminlogin",userData)