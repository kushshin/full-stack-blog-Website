import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HandleViews } from '../API Services/PostAPI'
import { fetchPosts } from '../Redux/postSlice'
import { Link } from 'react-router-dom'
import { FaRegComment } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast,Bounce  } from 'react-toastify'
import { useAuth } from '../Context/AuthContext.jsx';



function AllBlogs() {
  const dispatch = useDispatch()
  const userId = window.localStorage.getItem('userID')
  const { posts, loading, error } = useSelector((state) => state.posts);
   const {username} = useAuth()


  // console.log(posts)
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  // useEffect(() => {
  //   setNewPost(posts);
  // }, [posts]);

  const [categories, setCategories] = useState(["All", "Web Development", "Development", "Marketing", "Search Engines", "Databases"])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredCategory = selectedCategory && selectedCategory !== "All" ? posts.filter((post) => post.categories === selectedCategory) : posts;
  // console.log(filteredCategory)

  const handleCategory = (category) => {
    setSelectedCategory(category)
  };

  const handleViews = async (id) => {
    try {
       await HandleViews(id)
      dispatch(fetchPosts())
      const msg = res.data.message
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
      })
            }
    } catch (error) {
     const msg = error?.response?.data?.message;
           console.log(msg)
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


  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1 className='text-center m-4 text-[24px] font-bold text-[#bbbb8e]'>OUR BLOGS</h1>
      <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32 ">
        <ul className='text-[#bbbb8e] '>
          <li className='hover:text-[#818147]'><a href='/'>Home</a></li>
          <li className='hover:text-[#818147]'><a>Blog</a></li>
        </ul>
      </div>
      <div className='  flex flex-col-reverse md:flex md:flex-row justify-center items-center md:items-start  gap-4  '>
        <div className='flex flex-col gap-4 '>
          {filteredCategory.map((post, id) => (
            <div key={id} className="card lg:card-side shadow-sm mt-4 mb-4 rounded-2xl " >
              <figure className="w-[400px] h-[350px] flex-shrink-0 ">
                <img className='w-full h-full object-cover'
                  src={post.image}
                  alt="Album" />
              </figure>
              <div className="card-body  max-w-[380px] break-words">
                <h4>Category : {post.categories}</h4>
                <h2 className="card-title">{post.title}</h2>
                <div className=' items-center gap-2'>
                  <h4 className='text-[10px]'>{new Date(post.createdAt).toLocaleDateString()}</h4>
                  <h5 className='text=[12px]'>Author- {post.username.toUpperCase()}</h5>
                </div>
                <p>{post.shortDesc}</p>
                <div className='flex items-center gap-1'>
                  <FaRegComment />
                  <span>{post.comments.length}</span>
                  {post.likes.includes(userId) ? <IoIosHeart className='text-[17px] text-red-500' /> : <IoIosHeartEmpty className='text-[17px]' />}
                  <span >{post.likes.length}</span>
                  <MdOutlineRemoveRedEye />
                  <span>{post.views}</span>
                </div>
                <div className="card-actions justify-end">
             {username ? (
  <Link to={`/singlePost/${post._id}`}>
    <button
      className="btn bg-[#bbbb8e] text-white hover:text-[#47471e]"
      onClick={() => handleViews(post._id)}
    >
      Read More
    </button>
  </Link>
) : (
  <button
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
  </button>
)}

                </div>
              </div>
            </div>
          ))}
        </div>
        {/* //categories */}
        <div>
        <div className=' rounded-2xl my-4 bg-base-100 p-2 w-[450px] h-[200px] md:w-[400px] md:h-[300px]'>
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
        </div>
         <div className='box2 mt-4 hidden md:flex md:flex-col  gap-3'>
          {posts.map((post) =>
            <div className=" card bg-base-100 image-full  w-[430px] md:w-[400px] justify-center shadow-sm gap-2">
              <figure>
                <img
                  src={post.image}
                  alt=""
                  loading='lazy' />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.shortDesc}</p>
                <div className="card-actions justify-end">
              {username ? (<Link to={`/singlePost/${post._id}`} ><button className="btn bg-[#bbbb8e] text-white hover:text-[#47471e]">Read More</button></Link>):(  <button
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
      </div>
    </div>
  )
}

export default AllBlogs