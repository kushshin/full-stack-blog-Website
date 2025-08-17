import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter  as Router,Routes,Route } from 'react-router-dom'
import HomeLayout from './Components/HomeLayout'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import WritePost from './Pages/WritePost'
import EditPost from './Pages/EditPost'
import SinglePostPage from './Pages/SinglePostPage'
import AllBlogs from './Pages/AllBlogs'
import ContactPage from './Pages/ContactPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './Pages/UserProfile'
import EdituserProfile from './Pages/EdituserProfile'
import AboutUs from './Pages/AboutUs'

// import './App.css'

function App() {


  return (
    <>
    <div >
    
 {/* NAVBAR */}
  <Router>
          <Routes>
            <Route path="/" element={<HomeLayout/>} >
            <Route  index element={<HomePage/>} />
            <Route path="/register" element ={<RegisterPage/>}/>
            <Route path="/login" element ={<LoginPage/>}/>
            <Route path="/writePost" element ={<WritePost/>}/>
            <Route path="/profile/:id" element ={<UserProfile/>}/>
            <Route path="/EditUserProfile" element ={<EdituserProfile/>}/>
            <Route path="/editPost" element ={<EditPost/>}/>
            <Route path="/singlePost/:id" element ={<SinglePostPage/>}/>
            <Route path="/AllBlogs" element ={<AllBlogs/>}/>
            <Route path="/contact" element ={<ContactPage/>}/>
            <Route path="/about" element ={<AboutUs/>}/>
           </Route>
            {/* <Route path="/forgotPassword" element={<ForgotPassword/>} />
            <Route path="/reset-password/:token" element={<ResetPassword/>} /> */}
            </Routes>       
        </Router>
 {/* BREADCRUMS */}
 {/* INTRODUCTION */}
 {/* FEATUREDPOST | SEARCH/CATEGORIES */}
 {/* SUBSCRIPTION */}
 {/* FOOTER*/}
    
  <ToastContainer />
    </div>
    </>
  )
}

export default App
