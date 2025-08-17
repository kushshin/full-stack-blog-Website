import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../Redux/postSlice.js'
import { fetchUsers } from '../Redux/userSlice.js';
// import { GetUserPosts } from '../API Services/PostAPI'
import bgImage from '../../public/img/coverImage4.jpg'
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { FaCamera } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

function UserProfile() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { posts, loading, error } = useSelector((state) => state.posts);    
    const { users } = useSelector((state) => state.users);
    
    const getAllUserPosts = posts.filter((post) => post.postedBy._id === id)
    const getUser = users.filter((user) => user._id === id)



    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchUsers())
    }, [dispatch])



    return (
        <div>
            <div className='flex flex-col md:flex md:flex-row justify-between '>
                <div className='' >
                        {getUser.map((user) =>
                    <div>
                            <div className="  bg-cover bg-center text-white  rounded-t-3xl w-[450px] h-[150px] md:w-[950px] md:h-[300px] flex flex-col items-center justify-center text-center mx-4 md:mx-8  mt-8 " style={{ backgroundImage: `url(${bgImage})` }}>
                                {user.profilePic ? <Link to='/EditUserProfile'><img src={user.profilePic} alt="" className='bg-cover md:object-cover   rounded-full border-2 w-[100px] h-[100px]  top-48  left-16  absolute md:top-80 md:left-20' /></Link> :
                                    <div className=' w-[100px] h-[100px]  rounded-full border-2 bg-gray-500   top-48  left-16  absolute md:top-80 md:left-20 flex items-center justify-center'><span className='text-[28px] md:text-[36px] '> {user.username[0]}</span></div>}
                                    <Link to='/EditUserProfile'><div className='absolute left-36 top-64 md:left-40 md:top-96 text-[#eef2f5] text-[15px] md:text-[20px]'> <FaCamera /></div></Link>
                            </div>
                        <div className=' w-[450px] h-[100px] md:w-[950px]  md:h-[100px] bg-[#cfcf90] mx-4 md:mx-8 mb-8 rounded-b-3xl '>
                            <div className='text-white  p-14 md:p-10 text-[10px] md:text-[16px]'>
                            <h1 className=' flex items-center gap-2'>{user.username}  <Link to ='/EditUserProfile'><FiEdit2 /></Link></h1>
                            <h1 className=' flex items-center gap-2'>{user.email} <Link to ='/EditUserProfile'><FiEdit2 /></Link></h1>
                            </div>
                        </div>
                    </div>
                        )}
                    <div className=' flex flex-col  mx-8 mt-12'>
                        <h1 className='text-center m-4 text-[14px] font-bold text-[#bbbb8e]'>MY BLOGS</h1>
                        {getAllUserPosts.length == 0 ? <h1>write a Blog <a href="/writePost">GoBack</a></h1> : getAllUserPosts.map((post) => (
                            <div key={post.id} className="card  lg:card-side bg-base-100 shadow-sm mx-4 mt-4 mb-4 rounded-3xl" >
                                <figure>
                                    <img className='w-[450px] h-[350px]'
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
                                    <div className="card-actions justify-end">
                                        {/* {username ? <Link to={`/singlePost/${post._id}`}> <button className="btn  bg-[#bbbb8e] text-white">Read More</button></Link> : <button className="btn  bg-[#bbbb8e] text-white" onClick={() => alert("please login to read blog")}>Read More</button>} */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" w-[350px] m-4  ">
                    <div className=' m-2'>
                        <div className=' w-[440px] md:w-[300px] mb-4 '>
                            <ul className="list bg-base-100 rounded-3xl shadow-md p-4 mt-4">
                                <li className=" mb-2 text-center  bg-[#bbbb8e] font-semibold text-white rounded-xl">People also viewed</li>
                                {posts.slice(0, 3).map((post) => (
                                    <li className="list-row text-[#b1b16e]">
                                        <div><img className="size-10 rounded-full" src={post.postedBy.profilePic} /></div>
                                        <div>
                                            <div>{post.username}</div>
                                            <div className="text-xs uppercase font-semibold opacity-60">{post.shortDesc}</div>
                                        </div>
                                        <p className="list-col-wrap text-xs">
                                            "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
                                        </p>
                                        <div className="flex items-center gap-2 justify-end m-2 text-[12px]">
                                            {/* <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg> */}
                                            <Heart className='size-[14px]' />
                                            {post.likes.length}

                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg> */}
                                            <MessageCircle className='size-[14px]' />
                                            {post.comments.length}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile