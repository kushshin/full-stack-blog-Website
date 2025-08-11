import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../Redux/postSlice'
import { Link } from 'react-router-dom'
import { FaComment } from "react-icons/fa"
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";



function AllBlogs() {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

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
      <div className='flex flex-wrap gap-4 justify-center'>
        {posts.map((post,id) => (
          <div key={id} className="card bg-base-100 shadow-sm mt-4 mb-4 rounded-none w-[400px] h-[600px] flex" >
            <figure>
              <img className='w-full h-full object-cover'
                src={post.image}
                alt="Album" />
            </figure>
            <div className="card-body">
              <h4>Category : {post.categories}</h4>
              <h2 className="card-title">{post.title}</h2>
              <div className='flex gap-2 items-center'>
                <h4 className='text-[10px]'>{new Date(post.createdAt).toLocaleDateString()}</h4><span>/</span>
                <h5 className='text=[12px]'>BY {post.username.toUpperCase()}</h5>
              </div>
              <p>{post.shortDesc}</p>
              <div className='flex items-center gap-1'>
                 <FaComment /> 
              <p>{post.comments.length}</p>
              <div className='text-red-700'><IoIosHeart /></div>:
        <div ><IoIosHeartEmpty /></div>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/singlePost/${post._id}`}> <button className="btn  bg-[#bbbb8e] text-white">Read More</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBlogs