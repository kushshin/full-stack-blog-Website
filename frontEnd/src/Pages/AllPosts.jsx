import React,{useEffect,useState} from 'react'
import{useSelector,useDispatch} from 'react-redux'
import { fetchPosts } from '../Redux/postSlice'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext.jsx';
import { toast,Bounce  } from 'react-toastify'


function AllPosts({filteredPosts}) {
  const {username} = useAuth()
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts);
  const[showMore,setShowMore] = useState(3)
  console.log(filteredPosts)

 
  const loadMore=()=>{
  setShowMore((prev)=>prev + 2)
  }
// const filteredCategory =  selectedCategory && selectedCategory !== "All" ? posts.filter((post)=>post.categories === selectedCategory) : posts;

  useEffect(()=>{
   dispatch(fetchPosts())
  },[dispatch])

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
{filteredPosts.slice(0,showMore).map((post)=>(
        <div key={post.id} className="card lg:card-side  shadow-sm mt-4 mb-4  rounded-2xl" >
  <figure  className="w-[400px] h-[350px] flex-shrink-0 ">
    <img className='w-full h-full object-cover'
      src={post.image}
      alt="Album" />
  </figure>
  <div className="card-body text-[#b1b16e]">
    <h4>Category : {post.categories}</h4>
    <h2 className="card-title">{post.title}</h2>
    <div className='flex gap-2 items-center'>
    <h4 className='text-[10px] text-[#bbbb8e] '>Posted On : {new Date(post.createdAt).toLocaleDateString()}</h4><span>/</span>
    <h5 className='text=[12px]'>BY {post.username.toUpperCase()}</h5>
    </div>  
    <p className='text-[32px] font-semibold'>{post.shortDesc}</p>
    {/* <p>{post.desc}</p> */}
    <div className="card-actions justify-center">
{/* {username ? <Link to ={`/singlePost/${post._id}`}> <button className="btn  bg-[#bbbb8e] text-white">Read More</button></Link> : <button className="btn  bg-[#bbbb8e] text-white" onClick={()=>alert("please login to read blog")}>Read More</button>} */}
    {username ? (
  <Link to={`/singlePost/${post._id}`}>
    <button
      className="btn bg-[#bbbb8e] text-white"
      onClick={() => handleViews(post._id)}
    >
      Read More
    </button>
  </Link>
) : (
  <button
    className="btn bg-[#bbbb8e] text-white"
    onClick={() =>
      toast.error("Login to see blog", {
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
       ) )}
       <div className='flex justify-center m-3'>
{showMore < posts.length  &&  <button className="btn  bg-[#bbbb8e] text-white " onClick={loadMore}>Load More</button> }

       </div>
    </div>
  )
}

export default AllPosts