import React, { useEffect, useRef, useState } from 'react'
// import { useAuth } from '../Context/AuthContext.jsx';
import { EditUserProfile } from '../API Services/UserAPI.js';
import { fetchUsers } from '../Redux/userSlice.js';
import { useNavigate } from 'react-router-dom';


function EdituserProfile() {

    const userId = window.localStorage.getItem("userID");
    const[preview,setPreview] = useState("")
    const[username,setUsername] = useState("")
    const[profilePic,setProfilePic] = useState("")

    const[email,setEmail] = useState("")

    const fileInputRef = useRef(null)
        const navigate = useNavigate()
    
        const handleFileClick = () => {
            fileInputRef.current.click()
        }

        // useEffect(()=>{
        //     dispatch(fetchUsers())
        // },[dispatch])

        const handleUserProfile=async(e)=>{
            try {
                e.preventDefault()
                const formDetails = new FormData()
                formDetails.append('profilePic',profilePic)
                formDetails.append('username',username)
                formDetails.append('email',email)
              
                const res = await EditUserProfile(formDetails)
                console.log(res.data)
                 setPreview("")
                setUsername("")
                setEmail("")
                navigate("/")
            } catch (error) {
                console.log(error)
            }
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
            <form  encType="multipart/form-data" onSubmit={handleUserProfile}>
                <div className=' flex flex-col gap-y-4  px-12 md:px-32 py-4 text-[#a0a05f]'>
                    <h1 className='text-center'> Edit Profile</h1>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setProfilePic(file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleFileClick}
                        className="btn text-[#a0a05f] bg-base-100 w-fit"
                    >
                        Upload Profile Photo
                    </button>
                    {preview && (
                        <div className="mt-3">
                            <p>Image Preview:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                style={{ width: "300px", height: "auto", borderRadius: "8px" }}
                            />
                        </div>
                    )}
                    <input type="text" placeholder="username" className="input  w-[400px] md:w-full"  onChange={(e)=>setUsername(e.target.value)} />
                    <input type="text" placeholder="email" className="input w-[400px] md:w-full" onChange={(e)=>setEmail(e.target.value)} />
                    <div className='flex justify-center gap-2'>
                    <button className='py-2 px-4 rounded-2xl bg-[#bbbb8e] text-white text' type='submit'> update</button>
                    <button className='py-2 px-4 rounded-2xl bg-[#bbbb8e] text-white text'> Delete Account</button>
                    </div>

                </div>
            </form>
        </div>
    </div>
  )
}

export default EdituserProfile