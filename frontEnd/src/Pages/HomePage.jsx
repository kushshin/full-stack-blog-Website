import React from 'react'
import bgImage from '../../public/img/bgcoverImage.jpg'
import AllPosts from './AllPosts'
import MainCategories from './MainCategories'
import RecentPosts from './RecentPosts'

function HomePage() {
  return (
    <div>
      <div>
        {/* <img src="../img/coverImage1.jpg" alt="" className='p-16 '/> */}
        <div className="bg-cover bg-center text-white  rounded h-[500px] flex flex-col items-center justify-center text-center mx-8 my-24 " style={{ backgroundImage: `url(${bgImage})` }}>
          <h1 className='text-6xl font-bold '><span className='text-[#bbbb8e]'>T</span>e<span className='text-[#bbbb8e]'>c</span>h<span className='text-[#bbbb8e]'>n</span>o<span className='text-[#bbbb8e]'>l</span>o<span className='text-[#bbbb8e]'>g</span>y</h1> <br />
          <p>Technology refers to the application of scientific knowledge for practical purposes, enabling innovation and progress across various fields. It enhances communication, automates tasks, improves healthcare, and drives economic growth. Constantly evolving, technology shapes how we live, work, and interact, playing a vital role in modern society and future development.</p>
        </div>
        <div className=' flex flex-col md:flex-row  justify-around px-8 '>
          <div className='mt-4 flex-1 mr-8'>
            <h1>All Posts</h1>
            <div><AllPosts /></div>
          </div>
          {/* <div>featured post</div> */}
          <div>
            <div className='bg-base-100 rounded-full flex p-2 gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
              <input type="text" placeholder='search Post' className='bg-transparent outline-none' />
            </div>
            <div><MainCategories /></div>
            <div><RecentPosts/></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage