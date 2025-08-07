import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div className='bg-base-100 w-full md:h-16 flex items-center  justify-between px-4 '>
      {/* LOGO */}
      <div>
        <img src="../img/stackBits.png" alt="" className='w-32 h-16 ' />
      </div>
      {/* MOBILE MENU */}
      <div className='md:hidden'>
        <div className='cursor-pointer ' onClick={() => setOpen((prev) => !prev)}>   {open ?
      <div className='text-[24px]'><IoClose  /></div>  : <div className='text-[24px]'><GiHamburgerMenu /></div>}</div>
        <div className={`w-full bg-[#F5F5DC] h-[400px] absolute top-16 transition-all ease-in-out ${open ? '-right-0' : '-right-[100%]'} `}>
          <div className=' flex flex-col items-center gap-8 text-[#bbbb8e] mt-4'>
            <a href="/" className='text-[#a0a05f]'>Home </a>
            <a href="">About Us</a>
            <a href="/writePost">Write </a>
            <a href="/blog">Blog </a>
            <a href="/contact">Contact</a>
            <a href="/login"><button className='py-2 px-4 rounded-2xl bg-[#bbbb8e] text-white' >Login</button></a>
          </div>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className=' hidden md:flex items-center gap-4 text-[#bbbb8e]'>
        <a href="/" className='text-[#a0a05f]'>Home </a>
        <a href="">About Us</a>
        <a href="/writePost">Write </a>
        <a href="/blog">Blog </a>
        <a href="/contact">Contact</a>
      </div>
      <div className=' hidden md:flex gap-4'>
        <a href="/login"> <button className='py-2 px-4 rounded-2xl bg-[#bbbb8e] text-white'>Login</button></a>
      </div>
    </div>
  )
}

export default Navbar