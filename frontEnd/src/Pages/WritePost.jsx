import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext.jsx';
import { createPost } from '../API Services/PostAPI.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function WritePost({onPostCreated}) {
    const { username } = useAuth()
    const userId = window.localStorage.getItem("userID");


    const [title, setTitle] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [user, setUser] = useState(userId);
    const [preview, setPreview] = useState("");

    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    const handleFileClick = () => {
        fileInputRef.current.click()
    }

    const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const stripHtml = (html) => {
  let div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

    const handlePost = async (e) => {
        try {
            e.preventDefault()
            const postDetails = new FormData()
            postDetails.append("title", title)
            postDetails.append("shortDesc", shortDesc)
            postDetails.append("desc", stripHtml(desc));
            // postDetails.append("desc", desc)
            postDetails.append("image", image)
            postDetails.append("categories", category)
            postDetails.append("postedBy", user)
            postDetails.append("username", username)

            // setPreview(image)
            const res = await createPost(postDetails)
            console.log(res.data)
            setTitle("")
            setDesc("")
            setShortDesc("")
            setImage(null)
            setCategory("")
            // navigate(`/profile/${userId}`)
            if(onPostCreated){
                onPostCreated()
            }
        } catch (error) {
          console.log(error)
        }
    }
    return (
        <div>
            {/* <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a>Write</a></li>
                </ul>
            </div> */}
            <form onSubmit={handlePost} encType="multipart/form-data" >
                <div className=' flex flex-col gap-y-4  justify-center  px-12 md:px-32 py-4 text-[#a0a05f]'>
                    <h1 className='text-center'> Create New Blog</h1>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImage(file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleFileClick}
                        className="btn text-[#a0a05f] bg-base-100 w-fit"
                    >
                        Upload Cover Image
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
                    <input type="text" placeholder="Blog Title" className="input  w-[350px]  md:w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {/* <input type="text" placeholder="Slug (optional)" className="input w-full" /> */}
                    <select className="select w-[350px] md:w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option  >Select Category</option>
                        <option>All</option>
                        <option>Web Development</option>
                        <option>Development</option>
                        <option>Search Engines</option>
                        <option>Marketing</option>
                        <option>Databases</option>
                    </select>
                    <input type="text" placeholder="Short Description" className="input w-[350px] md:w-full" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
              <div className='bg-base-100 p-2 h-[360px] rounded-lg'>
                      <ReactQuill placeholder="write your blog" modules={modules} className=" w-[340px]  h-[275px] md:w-full md:h-[300px]" value={desc} onChange={(value) => setDesc(value)}/>    
                </div>
                    <button className='py-2 px-4  mt-10 rounded-2xl bg-[#bbbb8e] text-white text' type='submit'> Post</button>

                </div>
            </form>
        </div>
    )
}

export default WritePost