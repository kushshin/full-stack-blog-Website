import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";

function ContactPage() {
  return (
    <div>
      <div >
        <h1 className='text-center text-[40px] font-bold text-[#bbbb8e]'>CONTACT</h1>
        <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32 ">
          <ul className='text-[#bbbb8e] '>
            <li className='hover:text-[#818147]'><a href='/'>Home</a></li>
            <li className='hover:text-[#818147]'><a>Contact</a></li>
          </ul>
        </div>
        <div className=' flex flex-col gap-4 md:flex md:flex-row justify-around m-24'>
          <div className='flex flex-col items-center gap-2'>
            <div className='w-20 h-20 bg-[#9b9b68] rounded-full relative'><FaLocationDot className='absolute top-8 left-7 text-white text-[20px]'/></div>
                <span className='text-[#bbbb8e] text-center'>Address : Tech Street, <br /> MUMBAI 400072</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <div className='w-20 h-20 bg-[#9b9b68] rounded-full relative'><FaPhoneAlt className='absolute top-8 left-7 text-white text-[20px]'/></div>
          <span className='text-[#bbbb8e] text-center'>Phone : +91987654321</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <div className='w-20 h-20 bg-[#9b9b68] rounded-full relative'><FaTelegramPlane className='absolute top-7 left-6 text-white text-[24px]'/></div>
            
          <span className='text-[#bbbb8e] text-center'>Email : info@stackBits.com</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <div className='w-20 h-20 bg-[#9b9b68] rounded-full relative'><GiEarthAmerica className='absolute top-7 left-7 text-white text-[24px]'/></div>
         
          <span className='text-[#bbbb8e] text-center'>Website : www.stackBits.com</span>
          </div>
        
        </div>
          {/* contact page body */}
          <div className=" bg-base-100 w-[90%] mx-auto shadow-2xl  md:flex h-[600px] my-8 ">
            <div className="card-body  m-8">
              <label className="label">FULLNAME</label>
              <input type="email" className="input w-full" placeholder="Fullname" />
              <label className="label">EMAIL ADDRESS</label>
              <input type="email" className="input w-full" placeholder="Email" />
              <label className="label">SUBJECT</label>
              <input type="email" className="input w-full" placeholder="Subject" />
              <label className="label">MESSAGE</label>
              <textarea className="textarea w-full" placeholder="Your Message"></textarea>
              <button className="btn  bg-[#9b9b68] mt-4">SEND MESSAGE</button>
            </div>
            <div className=' hidden md:block items-center  '>
                <img className='h-[600px]' src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvbnRhY3R8ZW58MHx8MHx8fDA%3D" alt="" />
            </div>
          </div>
      </div>
    </div>
  )
}

export default ContactPage