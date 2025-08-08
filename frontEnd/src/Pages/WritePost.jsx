import React, { useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext.jsx';
import { createPost } from '../API Services/PostAPI.js';
import { useNavigate } from 'react-router-dom';
import { toast,Bounce  } from 'react-toastify'

function WritePost() {
    const { username } = useAuth()
    const userId = window.localStorage.getItem("userID");

    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [user, setUser] = useState(userId);
  
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleFileClick = () => {
        fileInputRef.current.click()
    }

    const handlePost = async (e) => {
        try {
            e.preventDefault()
            const postDetails = new FormData()
            postDetails.append("title", title)
            postDetails.append("shortDesc", shortDesc)
            postDetails.append("desc", desc)
            postDetails.append("image", image)
            postDetails.append("category", category)
            postDetails.append("user", user)
            postDetails.append("username", username)

            const res = await createPost(postDetails)
            setTitle("")
            setDesc("")
            setShortDesc("")
            setImage("")
            setCategory("")
             navigate("/")
            const msg = (res.data.message)
            if (msg) {
                toast.success(msg, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
             const msg = error?.response?.data?.message;
             // setError(msg);
             toast.error(msg, {
               position: "top-center",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: true,
               draggable: true,
               theme: "light",
             });
        }
    }
    return (
        <div>
            <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a>Write</a></li>
                </ul>
            </div>
            <form onSubmit={handlePost}>
                <div className=' flex flex-col gap-y-4  px-12 md:px-32 py-4 text-[#a0a05f]'>
                    <h1 className='text-center'>Create New Blog</h1>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])
                        }
                    />
                    <button
                        type="button"
                        onClick={handleFileClick}
                        className="btn text-[#a0a05f] bg-base-100 w-fit"
                    >
                        Upload Cover Image
                    </button>
                    <input type="text" placeholder="Blog Title" className="input  w-[400px] md:w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {/* <input type="text" placeholder="Slug (optional)" className="input w-full" /> */}
                    <select className="select w-[400px] md:w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option  >Select Category</option>
                        <option>All</option>
                        <option>Web Development</option>
                        <option>Development</option>
                        <option>Search Engines</option>
                        <option>Marketing</option>
                        <option>Databases</option>
                    </select>
                    <input type="text" placeholder="Short Description" className="input w-[400px] md:w-full" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
                    <textarea placeholder="write your blog" className="textarea w-[400px] md:w-full h-[300px]" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    <button className='py-2 px-4 rounded-2xl bg-[#bbbb8e] text-white text' type='submit'>Post</button>

                </div>
            </form>
        </div>
    )
}

export default WritePost