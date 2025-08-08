import React,{useState,useEffect} from 'react'
import{AllPost} from '../API Services/PostAPI'

function AllPosts() {
  const[allPosts,setAllPosts] = useState([])

  useEffect(()=>{
    const getAllPosts=async()=>{
     try {
      const res = await AllPost()
    setAllPosts(res.data.post)
     } catch (error) {
      console.log(error)
     }
    }
    getAllPosts()
  },[])
  return (
    <div>
      {allPosts.map((post)=>
        <div className="card lg:card-side bg-base-100 shadow-sm mt-4 mb-4 rounded-none">
  <figure>
    <img className='w-[450px] h-[350px]'
      src={post.image}
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{post.title}</h2>
    <p>{post.shortDesc}</p>
    <p>{post.desc}</p>
    <div className="card-actions justify-end">
      <button className="btn  bg-[#bbbb8e] text-white">Read More</button>
    </div>
  </div>
</div>
    )}
    </div>
  )
}

export default AllPosts