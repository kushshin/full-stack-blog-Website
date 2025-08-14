import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../Context/AuthContext.jsx';
import { createPost, SinglePost ,updatePost} from '../API Services/PostAPI.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify'

function EditPost() {
    const { username } = useAuth()
    const userId = window.localStorage.getItem("userID");
    const location = useLocation()
const id = location.state?.id || null;
const postID = id
// console.log(postID)

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

    const getSinglePost = async () => {
        try {
            const res = await SinglePost(id)
            const post = (res.data.post)
            console.log(post)
            const imageURL = post.image  || "";
            setPreview(imageURL)
            setTitle(post.title || "");
            setShortDesc(post.shortDesc || "");
            setDesc(post.desc || "");
            setCategory(post.categories || "");
            setUser(post.postedBy || userId);
            // setUserName(post. || "");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSinglePost()
    }, [])

    const handleEditPost = async(e)=>{
        e.preventDefault()
        try {            
        const editedDetails = new FormData();
        editedDetails.append("title", title);
        editedDetails.append("shortDesc", shortDesc);
        editedDetails.append("desc", desc);
        editedDetails.append("categories", category);
        editedDetails.append("postedBy", user)
            editedDetails.append("username", username)
        if (image) editedDetails.append("image", image);
    
        const res = await updatePost(editedDetails,postID)
        console.log(res.data)
                setTitle("")
                setDesc("")
                setShortDesc("")
                setImage(null)
                setCategory("")
                setPreview("")
                navigate('/AllBlogs')
        } catch (error) {
            console.log(error)
        }
    }

    // const handlePost = async (e) => {
    //     try {
    //         e.preventDefault()
    //         const postDetails = new FormData()
    //         postDetails.append("title", title)
    //         postDetails.append("shortDesc", shortDesc)
    //         postDetails.append("desc", desc)
    //         postDetails.append("image", image)
    //         postDetails.append("category", category)
    //         postDetails.append("user", user)
    //         postDetails.append("username", username)

    //         const res = await createPost(postDetails)
    //         setTitle("")
    //         setDesc("")
    //         setShortDesc("")
    //         setImage("")
    //         setCategory("")
    //         navigate("/")
    //         const msg = (res.data.message)
    //         if (msg) {
    //             toast.success(msg, {
    //                 position: "top-center",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: false,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //                 transition: Bounce,
    //             });
    //         }
    //     } catch (error) {
    //         const msg = error?.response?.data?.message;
    //         // setError(msg);
    //         toast.error(msg, {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             theme: "light",
    //         });
    //     }
    // }
    return (
        <div>
           <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32 ">
        <ul className='text-[#bbbb8e] '>
          <li className='hover:text-[#818147]'><a href='/'>Home</a></li>
          <li className='hover:text-[#818147]'><a href='/AllBlogs'>Blog</a></li>
          <li className='hover:text-[#818147]'><a>Edit</a></li>
        </ul>
      </div>
            <form onSubmit={handleEditPost} encType="multipart/form-data">
                <div className=' flex flex-col gap-y-4  px-12 md:px-32 py-4 text-[#a0a05f]'>
                    <h1 className='text-center'>Edit Blog</h1>
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
                    <button className='py-2 px-4 rounded-2xl bg-[#bbbb8e] text-white text' type='submit'>UpdatePost</button>
               
                </div>
            </form>
        </div>
    )
}

export default EditPost