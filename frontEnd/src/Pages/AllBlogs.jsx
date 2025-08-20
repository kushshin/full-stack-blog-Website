import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LikePost, DisLikePost } from '../API Services/PostAPI'
import { fetchPosts } from '../Redux/postSlice'
import { Link } from 'react-router-dom'
import { FaRegComment } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";



function AllBlogs() {
  const dispatch = useDispatch()
  const userId = window.localStorage.getItem('userID')
  const { posts, loading, error } = useSelector((state) => state.posts);
  // const [newPost, setNewPost] = useState([])


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

  // const likePost = async (postId) => {
  //   try {
  //     const res = await LikePost(postId)
  //     console.log(res.data)
  //     const updatedPost = res.data.likedPost
  //     setNewPost(prevPosts =>
  //       prevPosts.map(post =>
  //         post._id === updatedPost._id ? updatedPost : post
  //       )
  //     );
  //     // dispatch(fetchPosts())
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const disLikePost = async (postId) => {
  //   try {
  //     const res = await DisLikePost(postId)
  //     const updatedPost = res.data.dislikedPost
  //     setNewPost(prevPosts =>
  //       prevPosts.map(post =>
  //         post._id === updatedPost._id ? updatedPost : post
  //       )
  //     );
  //     //  dispatch(fetchPosts()); 
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
      <div className='  flex flex-col-reverse md:flex md:flex-row justify-center items-center md:items-start  gap-4 '>
      <div className='flex flex-col gap-4 '>
        {filteredCategory.map((post, id) => (
          <div key={id} className="card lg:card-side shadow-sm mt-4 mb-4 rounded-2xl  flex" >
            <figure>
              <img className='w-[450px] h-[350px]'
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
                <FaRegComment />
                <span>{post.comments.length}</span>
                {post.likes.includes(userId) ?<IoIosHeart className='text-[17px] text-red-500' />:<IoIosHeartEmpty className='text-[17px]' />}
                <span >{post.likes.length}</span>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/singlePost/${post._id}`}> <button className="btn  bg-[#bbbb8e] text-white">Read More</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* //categories */}
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
      </div>
    </div>
  )
}

export default AllBlogs