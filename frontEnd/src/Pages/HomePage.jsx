import React, { useEffect, useState } from 'react'
import bgImage from '../../public/img/bgcoverImage.jpg'
import AllPosts from './AllPosts'
import RecentPosts from './RecentPosts'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaSquarePinterest } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { useSelector } from 'react-redux'

function HomePage() {
  const { posts, loading, error } = useSelector((state) => state.posts);
  const[searchFilter,setSearchFilter] = useState("")


  const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      post.shortDesc.toLowerCase().includes(searchFilter.toLowerCase())||
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
        <div className="bg-cover bg-center text-white  rounded h-[500px] flex flex-col items-center justify-center text-center mx-8 mb-8 " style={{ backgroundImage: `url(${bgImage})` }}>
          <h1 className='text-6xl font-bold '><span className='text-[#bbbb8e]'>T</span>e<span className='text-[#bbbb8e]'>c</span>h<span className='text-[#bbbb8e]'>n</span>o<span className='text-[#bbbb8e]'>l</span>o<span className='text-[#bbbb8e]'>g</span>y</h1> <br />
          <p className='text-[#b1b16e] text-[20px]'>Technology refers to the application of scientific knowledge for practical purposes, enabling innovation and progress across various fields. It enhances communication, automates tasks, improves healthcare, and drives economic growth. Constantly evolving, technology shapes how we live, work, and interact, playing a vital role in modern society and future development.</p>
        </div>
            <h1 className='text-center text-[#b1b16e] font-semibold '>ALL POSTS</h1>
        <div className=' flex flex-col-reverse justify-center md:flex-row  md:justify-around  px-8 m-4'>
          <div className=' flex-1 md:mr-8'>
            <div><AllPosts filteredPosts={filteredPosts} /></div>
              <div className='block md:hidden'><RecentPosts posts={posts} /></div>
          </div>
          {/* <div>featured post</div> */}
          <div >
            <div className='bg-base-100 rounded-full flex p-2 gap-2 items-center mt-4 mb-4'>
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
              <input type="text" placeholder='search Post by Category' value={searchFilter} className='bg-transparent outline-none'  onChange={(e)=>setSearchFilter(e.target.value)}/>
            </div>
            {/* <div className=' rounded-2xl my-4 bg-base-100 p-2 '>
              <h1 className='text-center bg-[#bbbb8e] font-semibold text-white rounded-xl'>Categories</h1>
              <div className='p-4'>
                <ul>
                  {categories.map((category) => (
                    <div className='flex justify-between text-[#b1b16e]'>
                      <li onClick={() => handleCategory(category)} className={`cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`}>{category}</li>
                      {selectedCategory === category ? <span>{filteredCategory.length}</span> : ""}
                    </div>
                  ))}
                </ul>
              </div>
            </div> */}
            <div className='hidden md:block'><RecentPosts posts={posts} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage