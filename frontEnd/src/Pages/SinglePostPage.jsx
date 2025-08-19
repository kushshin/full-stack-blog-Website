import React, { useEffect, useState } from 'react'
import { useParams, Link ,useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../Redux/postSlice'
import axios from 'axios'
import { useAuth } from '../Context/AuthContext.jsx';
import { AddComments, DeleteComments, DeletePost } from '../API Services/PostAPI'
import { FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";

// import { useEffect } from 'react'

function SinglePostPage() {

  const { id } = useParams()
  const { posts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const { username } = useAuth()
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState([])
  const userId = window.localStorage.getItem('userID')
  const navigate = useNavigate()


  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts())
    }
  }, [dispatch, posts.length])

  const post = posts.find((p) => p._id === id)
  // console.log(post)
const deletePost =async(postId)=>{
  console.log(postId)
  try {
    const res = await DeletePost(postId)
console.log(res)
 dispatch(fetchPosts())
  } catch (error) {
    console.log(error)
  }
}

const handleEditPost=async(id)=>{
navigate("/editPost", { state: { id } });
}


  const Comments = async (id) => {
    try {
      // console.log(id)
      const res = await AddComments({ text: comment, user: userId, username }, id)
      setAllComments(res.data.comment.comments)
      setComment("");
      dispatch(fetchPosts())
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async (postid, commentid) => {
    // console.log(commentid)
    // console.log(postid)
    try {
      const res = await DeleteComments(postid, commentid)
      console.log(res)
      dispatch(fetchPosts())
    } catch (error) {
      console.log(error)
    }
  }



  if (!post) {
    return (
      <div className="text-center m-8">
        <h2 className="text-red-500">Post not found!</h2>
        <Link to="/AllBlogs" className="text-blue-500 underline">Go back</Link>
      </div>
    )
  }
  return (
    <div>
      <h1 className='text-center m-4 text-[24px] font-bold text-[#bbbb8e]'>OUR BLOGS</h1>
      <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32 ">
        <ul className='text-[#bbbb8e] '>
          <li className='hover:text-[#818147]'><a href='/'>Home</a></li>
          <li className='hover:text-[#818147]'><a href='/AllBlogs'>Blog</a></li>
          <li className='hover:text-[#818147]'><a>Blog Article</a></li>
        </ul>
      </div>
      <div className="card lg:card bg-base-100 shadow-sm rounded-none w-[90%] m-auto my-4">
        <figure>
          <img
            src={post.image}
            alt="Album" className='w-full h-[550px] object-cover' />
        </figure>
        <div className="card-body">
          <div className='flex justify-between gap-2'>
          <h2 className="card-title flex-1">{post.title}</h2>
      {username === post.username ?   <div className='text-red-500 cursor-pointer ' onClick={()=>handleEditPost(post._id)}>
           <FiEdit />
          </div>: ""}
      {username === post.username ?   <div onClick={()=>deletePost(post._id)} className='text-red-500 cursor-pointer'>
           <FaRegTrashAlt />
          </div>: ""}
          </div>
          <div className='flex gap-2 items-center'>
            <h4 className='text-[10px]'>{new Date(post.createdAt).toLocaleDateString()}</h4><span>/</span>
            <h5 className='text=[12px]'>BY {post.username.toUpperCase()}</h5>
          </div>
          <p>{post.shortDesc}</p>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
      <p className='w-[90%] m-auto  text-justify'>{post.desc}</p>
      <div className='m-4'>
        <h1 className="mt-6 mb-2 ml-20 text-lg font-semibold">Comments</h1>
        <div className="flex flex-col gap-y-2 items-center">
          <input
            type="text"
            placeholder="Comment here"
            className="input w-[400px] md:w-[90%]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {username? 
          <button
            onClick={() => Comments(post._id)}
            className="btn bg-[#bbbb8e] text-white "
          >
            Add Comment
          </button>:
          <button
            onClick={() => alert("please login to comment")}
            className="btn bg-[#bbbb8e] text-white "
          >
            Add Comment
          </button>
        }
          {post.comments.map((comment, id) => (
            <div key={id} className=' border-2 w-[90%] flex flex-col gap-4 rounded-lg p-2'>
              <div className='flex gap-4 items-center'>
                <div className='flex flex-1 gap-2 items-center'>
              <h5 className='text-[#77772e]'>{comment.username}</h5>
             <h4 className='text-[12px]'>{format(new Date(comment.createdAt), "dd MMMM yyyy")}</h4>
                </div>
                {username === comment.username ? <button onClick={() => deleteComment(post._id, comment._id)} className='text-red-500'><FaRegTrashAlt /></button> : ""}
              </div>
              <div className='flex justify-between'>
                <h4>{comment.text}</h4>
              </div>
         
         
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage