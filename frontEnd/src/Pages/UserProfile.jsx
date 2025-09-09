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
import { useAuth } from '../Context/AuthContext.jsx';
import { MdDashboard } from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { FaUser } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import WritePost from './WritePost.jsx';
import EdituserProfile from './EdituserProfile.jsx';
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function UserProfile() {
    const [activeTab, setActiveTab] = useState("DashBoard")
    const { id } = useParams()
    const { username } = useAuth()
    const dispatch = useDispatch()
    const userId = window.localStorage.getItem('userID')
    const { posts, loading, error } = useSelector((state) => state.posts);
    const { users } = useSelector((state) => state.users);

    const getAllUser = posts.filter((post) => post.postedBy?._id === id)
    const userLikes = (getAllUser.map((like) => like.likes))
    const userComments = (getAllUser.map((comment) => comment.comments))
    const getUser = users.filter((user) => user._id === id)
    const getUserName = users.filter((user) => user._id === userId)
    const nUser = getUserName.map((user)=>user.username)




    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchUsers())
    }, [dispatch])



    return (
        <div>
            <div className='md:flex mx-8  gap-4 my-4  '>
                <div className=' w-full md:w-[250px] bg-base-100 rounded-2xl'>
                    <div>
                        <div className=' text-center font-semibold text-[#8f8f5b] m-4'>{nUser.toString().toUpperCase()}</div>
                        <ul className='flex flex-wrap justify-center gap-3 md:flex md:flex-col   m-4 p-2 md:m-8  md:gap-y-8 md:justify-start text-[12px] md:text-[15px]'>
                            <li className={`flex items-center   justify-center p-1 md:gap-2 ${activeTab === "DashBoard" ? " rounded-lg bg-[#818147] text-white" : "text-gray-600"
                                }`} onClick={() => setActiveTab("DashBoard")}><MdDashboard /><span >DashBoard</span></li>
                            <li className={`flex items-center   justify-center p-1 md:gap-2 ${activeTab === "MyPosts" ? "rounded-lg bg-[#818147] text-white" : "text-gray-600"
                                }`} onClick={() => setActiveTab("MyPosts")}><BsFilePost /><span>MyPosts</span></li>
                            <li className={`flex items-center   justify-center  p-1 md:gap-2 ${activeTab === "CreateBlog" ? "rounded-lg bg-[#818147] text-white" : "text-gray-600"
                                }`} onClick={() => setActiveTab("CreateBlog")}><IoIosCreate /><span>Create Blog</span></li>
                            <li className={`flex items-center justify-center  p-1 md:gap-2 ${activeTab === "Settings" ? "rounded-lg bg-[#818147] text-white" : "text-gray-600"
                                }`} onClick={() => setActiveTab("Settings")}><IoSettingsSharp />Settings<span></span></li>
                        </ul>
                    </div>
                </div>
                <div className=' flex-1  bg-base-100 rounded-2xl ' >
                    {/* right */}
                    {activeTab === "DashBoard" && <div className=' pt-1 md:m-4 '>
                        {getUser.map((user) =>
                            <div>
                                <div className="  bg-cover bg-center text-white  rounded-t-3xl w-[400px] h-[150px] md:w-[950px] md:h-[300px] flex flex-col items-center justify-center text-center mx-4 md:mx-8  mt-8 " style={{ backgroundImage: `url(${bgImage})` }}>
                                    {user.profilePic ?  <button onClick={() => setActiveTab("Settings")}><img src={user.profilePic} alt="" className='bg-cover md:object-cover   rounded-full border-2 w-[70px] h-[70px]  md:w-[100px] md:h-[100px] top-80  left-16  absolute md:top-80 md:left-[420px]' /> </button> :
                                        <div className=' w-[70px] h-[70px]  md:w-[100px] md:h-[100px] rounded-full border-2 bg-gray-500   top-80  left-16  absolute md:top-80 md:left-[420px] flex items-center justify-center'><span className='text-[28px] md:text-[36px] '> {user.username[0]}</span></div>}
                                    <button onClick={() => setActiveTab("Settings")}><div className='absolute left-28 top-[370px] md:left-[500px] md:top-96 text-[#eef2f5] text-[15px] md:text-[20px]'> <FaCamera /></div> </button>
                                </div>
                                <div className=' w-[400px] h-[100px] md:w-[950px]  md:h-[100px] bg-[#cfcf90] mx-4 md:mx-8 mb-8 rounded-b-3xl '>
                                    <div className='text-white  p-14 md:p-10 text-[10px] md:text-[16px]'>
                                        <h1 className=' flex items-center gap-2'>{user.username}  <button onClick={() => setActiveTab("Settings")}>
                                            <FiEdit2 />
                                        </button></h1>
                                        <h1 className=' flex items-center gap-2'>{user.email}<button onClick={() => setActiveTab("Settings")}>
                                            <FiEdit2 />
                                        </button></h1>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className=" shadow  flex  md:flex gap-8 ">
                            <div className="stat flex flex-col items-center">
                                <div className="stat-title text-[12px]  md:text-[18px]">Total Posts</div>
                                <div className="stat-value text-[#8f8f5b] text-[16px] md:text-[24px]">{getAllUser.length}</div>
                                {/* <div className="stat-desc">21% more than last month</div> */}
                            </div>
                            <div className="stat flex flex-col items-center">
                                <div className="stat-title text-[12px]  md:text-[18px]">Total Likes</div>
                                <div className="stat-value text-[#8f8f5b] text-[16px] md:text-[24px]">{userLikes.flat().length}</div>
                                {/* <div className="stat-desc">21% more than last month</div> */}
                            </div>
                            <div className="stat flex flex-col items-center ">
                                <div className="stat-title text-[12px]  md:text-[18px]">Total Comments</div>
                                <div className="stat-value text-[#8f8f5b] text-[16px] md:text-[24px]">{userComments.flat().length}</div>
                                {/* <div className="stat-desc">21% more than last month</div> */}
                            </div>
                        </div>
                    </div>}
                    {activeTab === "MyPosts" && (
                        getAllUser.length === 0 ? (
                            <h1 className='flex justify-center items-center p-6  font-semibold text-[24px] '>No Blog to show </h1>
                        ) : (
                            getAllUser.map((post) => (
                                <div key={post._id} className="card lg:card-side bg-base-100 shadow-sm mx-4 mt-4 pt-2 mb-4 rounded-3xl max-w-full">
                                    <figure className="w-[400px] h-[350px] flex-shrink-0 ">
                                        <img className="w-full h-full object-cover " src={post.image} alt="Album" />
                                    </figure>
                                    <div className="card-body text-[#b1b16e] ">
                                        <h4>Category : {post.categories}</h4>
                                        <h2 className="card-title">{post.title}</h2>
                                        <div className="">
                                            <h4 className="text-[10px] text-[#bbbb8e]">
                                                Posted On : {new Date(post.createdAt).toLocaleDateString()}
                                            </h4>
                                            <h5 className="text=[12px]">author- {post.username.toUpperCase()}</h5>
                                        </div>
                                        <p className="text-[24px] font-semibold">{post.shortDesc}</p>
                                        <div className="flex items-center gap-1">
                                            <FaRegComment />
                                            <span>{post.comments.length}</span>
                                            {post.likes.includes(userId) ? (
                                                <IoIosHeart className="text-[17px] text-red-500" />
                                            ) : (
                                                <IoIosHeartEmpty className="text-[17px]" />
                                            )}
                                            <span>{post.likes.length}</span>
                                            <MdOutlineRemoveRedEye />
                                            <span>{post.views}</span>
                                        </div>
                                        <div className="card-actions justify-end">
                                            {username ? (
                                                <Link to={`/singlePost/${post._id}`}>
                                                    <button className="btn bg-[#bbbb8e] text-white">Read More</button>
                                                </Link>
                                            ) : (
                                                <button
                                                    className="btn bg-[#bbbb8e] text-white"
                                                    onClick={() => alert("please login to read blog")}
                                                >
                                                    Read More
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                    {activeTab === "CreateBlog" && <WritePost onPostCreated={() => { setActiveTab("MyPosts"), dispatch(fetchPosts()) }} />}
                    {activeTab === "Settings" && <EdituserProfile onEditProfile={() => { setActiveTab("DashBoard"), dispatch(fetchUsers()) }} />}
                </div>
            </div>
        </div>
    )
}

export default UserProfile