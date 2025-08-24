import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchPosts } from '../Redux/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { LikePost, DisLikePost, AddComments, DeleteComments, DeletePost,UpdatedComments } from '../API Services/PostAPI'
import { useAuth } from '../Context/AuthContext.jsx'
import { FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

function SinglePostPage() {
  const { id } = useParams()
  const { posts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const { username } = useAuth()
  const [comment, setComment] = useState("")
  const [editCommentId, setEditCommentId] = useState(null)
  const [newPost, setNewPost] = useState(null)
  const userId = window.localStorage.getItem('userID')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const foundPost = posts.find((p) => p._id === id);

  useEffect(() => {
      setNewPost(foundPost);
  }, [foundPost]);

  const deletePost = async (postId) => {
    try {
      await DeletePost(postId)
      dispatch(fetchPosts())
      navigate("/AllBlogs") // redirect after delete
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditPost = (id) => {
    navigate("/editPost", { state: { id } });
  }

const likePost = async (postId) => {
    try {
      const res = await LikePost(postId)
      const updatedPost = res.data.likedPost
      console.log(updatedPost)
      setNewPost(prevPost => prevPost._id === updatedPost._id ? updatedPost : foundPost
      )
    } catch (error) {
      console.log(error)
    }
  }

const disLikePost = async (postId) => {
    try {
      const res = await DisLikePost(postId)
      const updatedPost = res.data.dislikedPost
      console.log(updatedPost)
  setNewPost(prevPost => prevPost._id === updatedPost._id ? updatedPost : foundPost)
    } catch (error) {
      console.log(error)
    }
  }

  const Comments = async (id) => {
    try {
      const res = await AddComments({ text: comment, user: userId, username }, id)
      setNewPost(res.data.comment) 
      setComment("");
     
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditComment = async (commentId) => {
    try {
      const editcomment = newPost.comments.filter((comment)=>comment._id === commentId);
      setComment(editcomment[0].text )
     setEditCommentId(commentId)
    } catch (error) {
      console.log(error)
    }
  }

   const cancelEdit = () => {
    setComment("");
    setEditCommentId(null);
  };

  const updateComment = async (postId, commentId) => {
    try {
      const res = await UpdatedComments(postId, commentId, { text: comment }); 
      setNewPost(res.data.updatedPost);
      setComment("");
      setEditCommentId(null);
       dispatch(fetchPosts())
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (postid, commentid) => {
    try {
      const res = await DeleteComments(postid, commentid)
      setNewPost(res.data.comment) 
       dispatch(fetchPosts())
    } catch (error) {
      console.log(error)
    }
  }
//  console.log({po:newPost})
  if (!newPost) {
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
      <div       className="breadcrumbs text-[12px] md:text-sm px-12 md:px-32 ">
        <ul className='text-[#bbbb8e] '>
          <li className='hover:text-[#818147]'><a href='/'>Home</a></li>
          <li className='hover:text-[#818147]'><a href='/AllBlogs'>Blog</a></li>
          <li className='hover:text-[#818147]'><a href={`/profile/${userId}`}>Profile</a></li>
          <li className='hover:text-[#818147]'><a>Blog Article</a></li>
        </ul>
      </div>
      <div className="card lg:card bg-base-100 shadow-sm rounded-none w-[90%] m-auto my-4">
        <figure>
          <img
            src={newPost.image}
            alt="Album" className='w-full h-[550px] object-cover' />
        </figure>
        <div className="card-body">
          <div className='flex justify-between gap-2'>
            <h2 className="card-title flex-1">{newPost.title}</h2>
            {newPost.likes.includes(userId) ? (
           <div className='text-red-700  text-[22px] cursor-pointer'><IoIosHeart onClick={() => disLikePost(newPost._id)} /> </div>
         ) : (
           <div className='text-red-700 text-[22px] cursor-pointer' ><IoIosHeartEmpty onClick={() => likePost(newPost._id)} /></div>
         )}
            {username === newPost.username && (
              <>
                <div className='text-red-500 text-[20px] cursor-pointer' onClick={() => handleEditPost(newPost._id)}>
                  <FiEdit />
                </div>
                <div onClick={() => deletePost(newPost._id)} className='text-red-500 text-[20px] cursor-pointer'>
                  <FaRegTrashAlt />
                </div>
              </>
            )}
          </div>
          <div className='flex gap-2 items-center'>
            <h4 className='text-[10px]'>{new Date(newPost.createdAt).toLocaleDateString()}</h4><span>/</span>
            <h5 className='text=[12px]'>BY {newPost.username}</h5>
          </div>
          <p>{newPost.shortDesc}</p>
          {/* <div className="card-actions justify-end">
          </div> */}
        </div>
      </div>
      <p className='w-[90%] m-auto text-justify'>{newPost.desc}</p>
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
         {username ? (
            editCommentId? (
              <div className="flex gap-2">
                <button
                  onClick={() => updateComment(newPost._id, editCommentId)}
                  className="btn bg-[#bbbb8e] text-white"
                >
                  Update Comment
                </button>
                <button
                  onClick={cancelEdit}
                  className="btn bg-gray-400 text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => Comments(newPost._id)}
                className="btn bg-[#bbbb8e] text-white"
              >
                Add Comment
              </button>
            )
          ) : (
            <button
              onClick={() => alert("please login to comment")}
              className="btn bg-[#bbbb8e] text-white"
            >
              Add Comment
            </button>
          )}

          <div className=' w-[90%] flex flex-col gap-4 '>
          {newPost.comments.map((comment, id) => (
            <div key={id}  className='bg-base-100 rounded-lg p-2'>
              <div className='flex gap-4 items-center'>
                <div className='flex  gap-4 items-center'>
                  <img src={comment.user.profilePic} alt="" className='w-10 h-10 rounded-full' />
                  <h5 className='text-[#77772e]'>{comment.username}</h5>
                  <h4 className='text-[12px]'>{format(new Date(comment.createdAt), "dd MMMM yyyy")}</h4>
                </div>
                {username === comment.username &&
                <div >
                  <button className='text-red-500 text-[16px] cursor-pointer' onClick={()=>handleEditComment(comment._id)}>
                  <FiEdit />
                </button>
                  <button onClick={() => deleteComment(newPost._id, comment._id)} className='text-red-500 cursor-pointer'>
                    <FaRegTrashAlt />
                  </button>
              </div>
                }
              </div>
              <div className='flex justify-between'>
                <h4>{comment.text}</h4>
                
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage
