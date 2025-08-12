import React,{useEffect} from 'react'
import{useSelector,useDispatch} from 'react-redux'
import { fetchPosts } from '../Redux/postSlice'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext.jsx';


function AllPosts({selectedCategory}) {
  const {username} = useAuth()
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts);

const filteredCategory =  selectedCategory && selectedCategory !== "All" ? posts.filter((post)=>post.categories === selectedCategory) : posts;

  useEffect(()=>{
   dispatch(fetchPosts())
  },[dispatch])

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
{filteredCategory.map((post)=>(
        <div key={post.id} className="card lg:card-side bg-base-100 shadow-sm mt-4 mb-4 rounded-none" >
  <figure>
    <img className='w-[450px] h-[350px]'
      src={post.image}
      alt="Album" />
  </figure>
  <div className="card-body">
    <h4>Category : {post.categories}</h4>
    <h2 className="card-title">{post.title}</h2>
    <div className='flex gap-2 items-center'>
    <h4 className='text-[10px] text-[#bbbb8e] '>Posted On : {new Date(post.createdAt).toLocaleDateString()}</h4><span>/</span>
    <h5 className='text=[12px]'>BY {post.username.toUpperCase()}</h5>
    </div>  
    <p className='text-[32px] font-semibold'>{post.shortDesc}</p>
    {/* <p>{post.desc}</p> */}
    <div className="card-actions justify-end">
{username ? <Link to ={`/singlePost/${post._id}`}> <button className="btn  bg-[#bbbb8e] text-white">Read More</button></Link> : <button className="btn  bg-[#bbbb8e] text-white" onClick={()=>alert("please login to read blog")}>Read More</button>}
    </div>
  </div>
</div>
       ) )}

    </div>
  )
}

export default AllPosts