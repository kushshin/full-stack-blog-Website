import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function SinglePostPage() {

  const { id } = useParams()
  const { posts } = useSelector((state) => state.posts)
  const post = posts.find((p) => p._id === id)
  console.log(post)
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
      <div className="card lg:card-side bg-base-100 shadow-sm rounded-none w-[90%] m-auto my-4">
        <figure>
          <img
            src={post.image}
            alt="Album" className='w-[600px] h-[550px] ' />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
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
    </div>
  )
}

export default SinglePostPage