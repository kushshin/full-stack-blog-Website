import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import bgImage from '/img/bgcoverImage.jpg'
import AllPosts from './AllPosts'
import RecentPosts from './RecentPosts'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquarePinterest } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { useAuth } from '../Context/AuthContext'
import { toast,Bounce  } from 'react-toastify'

function HomePage() {
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchFilter, setSearchFilter] = useState("")
  const{username} = useAuth()


  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    post.shortDesc.toLowerCase().includes(searchFilter.toLowerCase()) ||
    post.categories.toLowerCase().includes(searchFilter.toLowerCase())
  )
  // const handleSearch=async()=>{
  // }


  return (
    <div>
      <div>
        {/* <img src="../img/coverImage1.jpg" alt="" className='p-16 '/> */}
        <div className='flex justify-center my-6 gap-4'>
          <FaFacebookSquare className='text-[#bbbb8e] md:w-6 md:h-6' />
          <FaInstagramSquare className='text-[#bbbb8e] md:w-6 md:h-6' />
          <FaSquareYoutube className='text-[#bbbb8e] md:w-6 md:h-6' />
          <FaSquareWhatsapp className='text-[#bbbb8e] md:w-6 md:h-6' />
          <FaSquarePinterest className='text-[#bbbb8e] md:w-6 md:h-6' />
        </div>
        <div className=" box2 bg-cover bg-center text-white  rounded h-[500px] flex flex-col items-center justify-center text-center mx-8 mb-8 " style={{ backgroundImage: `url(${bgImage})` }}>
          <h1 className='text-6xl font-bold '><span className='text-[#bbbb8e]'>T</span>e<span className='text-[#bbbb8e]'>c</span>h<span className='text-[#bbbb8e]'>n</span>o<span className='text-[#bbbb8e]'>l</span>o<span className='text-[#bbbb8e]'>g</span>y</h1> <br />
          <p className='text-[#b1b16e] text-[20px]'>Technology refers to the application of scientific knowledge for practical purposes, enabling innovation and progress across various fields. It enhances communication, automates tasks, improves healthcare, and drives economic growth. Constantly evolving, technology shapes how we live, work, and interact, playing a vital role in modern society and future development.</p>
        </div>
        <h1 className='text-center text-[#b1b16e] font-semibold '>ALL POSTS</h1>
        <div className=' flex flex-col-reverse justify-center md:flex-row  md:justify-around  px-8 m-4'>
          <div className=' flex-1 md:mr-8'>
            <div className='box2'><AllPosts filteredPosts={filteredPosts} /></div>
            <div className=' box2 block md:hidden'><RecentPosts posts={posts} /></div>
             <div className='  box2 relative block md:hidden'>
              <img className=" md:w-[300px] rounded-2xl" src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
              <div className='  absolute bottom-10 text-[#b1b16e]  m-4 '>
                <span className='text-[24px] font-semibold'>Tech you love</span>
                <p className='text-[12px]  text-white font-semibold'>Technology that turns big problems into simple solutions. </p>
                <button className='btn mt-2 bg-transparent text-white hover:text-black'>get App</button>
              </div>
            </div>
          </div>
          {/* <div>featured post</div> */}
          <div className='' >
            <div className='bg-base-100 rounded-full flex p-2 gap-2 items-center mt-4 mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
              <input type="text" placeholder='search Post by Category' value={searchFilter} className='bg-transparent outline-none' onChange={(e) => setSearchFilter(e.target.value)} />
            </div>
            <div className='hidden box2 md:block'><RecentPosts posts={posts} /></div>
            <div className=' box2 relative hidden md:block'>
              <img className=" md:w-[300px] rounded-2xl" src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
              <div className='  absolute bottom-10 text-[#b1b16e]  m-4 '>
                <span className='text-[24px] font-semibold'>Tech you love</span>
                <p className='text-[12px]  text-white font-semibold'>Technology that turns big problems into simple solutions. </p>
                <button className='btn mt-2 bg-transparent text-white hover:text-black'>get App</button>
              </div>
            </div>
          </div>
        </div>
      </div>
          <div className='box2 mt-4 mb-4 ml-12 flex flex-col md:ml-0 md:flex md:flex-row  justify-center gap-6 w-full'>
          {posts.slice(0,4).map((post) =>
            <div className=" card bg-base-100 image-full  w-[400px] md:w-[300px] ">
              <figure>
                <img
                  src={post.image}
                  alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.shortDesc}</p>
                <div className="card-actions justify-end">
              {username ?  ( <Link to={`/singlePost/${post._id}`} ><button className="btn bg-[#bbbb8e] text-white hover:text-[#47471e]">Read More</button></Link>):(  <button
                  className="btn bg-[#bbbb8e] text-white hover:text-[#47471e]"
                  onClick={() =>
                    toast.error("SignUp to see blog", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "light",
                    })
                  }
                >
                  Read More
                </button>)}
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default HomePage