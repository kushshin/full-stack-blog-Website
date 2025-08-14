import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext.jsx';
// import { createPost, SinglePost, updatePost } from '../API Services/PostAPI.js';
import { useNavigate } from 'react-router-dom';


function CreateProfile() {
    const { username } = useAuth()
    const userId = window.localStorage.getItem("userID");

    const fileInputRef = useRef(null)
        const navigate = useNavigate()
    
        const handleFileClick = () => {
            fileInputRef.current.click()
        }
  return (
    <div>
          <div>
            <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a>Profile</a></li>
                </ul>
            </div>
            <form  encType="multipart/form-data" >
                <div className=' flex flex-col gap-y-4  px-12 md:px-32 py-4 text-[#a0a05f]'>
                    <h1 className='text-center'> Create New Blog</h1>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        // onChange={(e) => {
                        //     const file = e.target.files[0];
                        //     if (file) {
                        //         setImage(file);
                        //         setPreview(URL.createObjectURL(file));
                        //     }
                        // }}
                    />
                    <button
                        type="button"
                        onClick={handleFileClick}
                        className="btn text-[#a0a05f] bg-base-100 w-fit"
                    >
                        Upload Cover Image
                    </button>
                    {/* {preview && (
                        <div className="mt-3">
                            <p>Image Preview:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: "300px", height: "auto", borderRadius: "8px" }}
                            />
                        </div>
                    )} */}
                    <input type="text" placeholder="username" className="input  w-[400px] md:w-full"  />
                    {/* <input type="text" placeholder="Slug (optional)" className="input w-full" /> */}
                    <select className="select w-[400px] md:w-full" >
                        <option  >Select Category</option>
                        <option>All</option>
                        <option>Web Development</option>
                        <option>Development</option>
                        <option>Search Engines</option>
                        <option>Marketing</option>
                        <option>Databases</option>
                    </select>
                    <input type="text" placeholder="Short Description" className="input w-[400px] md:w-full"  />
                    <textarea placeholder="write your blog" className="textarea w-[400px] md:w-full h-[300px]" ></textarea>
                    <button className='py-2 px-4 rounded-2xl bg-[#bbbb8e] text-white text' type='submit'> Post</button>

                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateProfile