import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../Redux/postSlice'
import { fetchUsers } from '../Redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { MdDashboard } from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { FaUser } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5";
import { DeleteUser, BlockUser, UnBlockUser, EditUserProfile } from '../API Services/UserAPI'
import { DeleteSelectedPost } from '../API Services/PostAPI';
import { IoIosCreate } from "react-icons/io";
import EdituserProfile from './EdituserProfile';
import bgImage from '../../public/img/coverImage4.jpg'
import { FaCamera } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

function AdminDashBoard() {
  const [activeTab, setActiveTab] = useState("DashBoard")
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)
  const { users } = useSelector((state) => state.users)
  console.log(users)
  const allUsers = users.filter((user) => user.role === "user")
  const adminUser = users.filter((user) => user.role === "admin")
  const likes = posts.map((post) => post.likes)
  const comments = posts.map((post) => post.comments)


  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchPosts())
  }, [dispatch])

  const deleteUser = async (id) => {
    try {
      const res = await DeleteUser(id)
      console.log(res.data)
      dispatch(fetchUsers())
    } catch (error) {
      console.log(error)
    }
  }

  const blockUser = async (id) => {
    try {
      const res = await BlockUser(id)
      console.log(res.data)
      dispatch(fetchUsers())
    } catch (error) {
      console.log(error)
    }
  }

  const unBlockUser = async (id) => {
    try {
      const res = await UnBlockUser(id)
      console.log(res.data)
      dispatch(fetchUsers())
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSelectedPost = async (id) => {
    try {
      const res = await DeleteSelectedPost(id)
      console.log(res.data)
      dispatch(fetchPosts())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='md:flex mx-8  gap-4 my-4 '>
      <div className=' w-full md:w-[250px] bg-base-100 rounded-2xl'>
        <div>
          <div className='  font-semibold text-center'>ADMIN</div>
          <ul className='flex flex-wrap justify-center gap-3 md:flex md:flex-col   m-4 p-2 md:m-8  md:gap-y-8 md:justify-start text-[12px] md:text-[15px]'>
            <li className={`flex items-center   justify-center p-1 md:gap-2 ${activeTab === "DashBoard" ? " rounded-lg bg-[#818147] text-white" : "text-gray-600"
              }`} onClick={() => setActiveTab("DashBoard")}><MdDashboard /><span >DashBoard</span></li>
            <li className={`flex items-center   justify-center p-1 md:gap-2 ${activeTab === "Posts" ? "rounded-lg bg-[#818147] text-white" : "text-gray-600"
              }`} onClick={() => setActiveTab("Posts")}><BsFilePost /><span>Posts</span></li>
            <li className={`flex items-center   justify-center  p-1 md:gap-2 ${activeTab === "Users" ? "rounded-lg bg-[#818147] text-white" : "text-gray-600"
              }`} onClick={() => setActiveTab("Users")}><IoIosCreate /><span>Users</span></li>
            <li className={`flex items-center justify-center  p-1 md:gap-2 ${activeTab === "Settings" ? "rounded-lg bg-[#818147] text-white" : "text-gray-600"
              }`} onClick={() => setActiveTab("Settings")}><IoSettingsSharp />Settings<span></span></li>
          </ul>
        </div>
      </div>
      <div className=' flex-1  bg-base-100 rounded-2xl ' >
        {/* right */}
            {activeTab === "DashBoard" && <div className=' pt-1 md:m-4 '>
          {adminUser.map((user) =>
            <div>
              <div className="  bg-cover bg-center text-white  rounded-t-3xl w-[400px] h-[150px] md:w-[950px] md:h-[300px] flex flex-col items-center justify-center text-center mx-4 md:mx-8  mt-8 " style={{ backgroundImage: `url(${bgImage})` }}>
                {user.profilePic ? <button onClick={() => setActiveTab("Settings")}><img src={user.profilePic} alt="" className='bg-cover md:object-cover   rounded-full border-2 w-[70px] h-[70px]  md:w-[100px] md:h-[100px] top-80  left-16  absolute md:top-80 md:left-[420px]' /> </button> :
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
          <div > 
          </div>
        </div>}
        <div className='m-4 '>
          <div className="stats shadow  flex flex-shrink md:flex gap-8 ">
            <div className="stat">
              <div className="stat-title">Total Posts</div>
              <div className="stat-value text-primary">{posts.length}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="stat ">
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">{likes.flat().length}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="stat  ">
              <div className="stat-title">Total Comments</div>
              <div className="stat-value text-primary">{comments.flat().length}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            <div className="stat">
              <div className="stat-title">Users</div>
              <div className="stat-value text-primary">{allUsers.length}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
        </div>
        <div className='m-4'>
          {/* {activeTab === "DashBoard" && <div className='flex flex-wrap gap-4'>
            {posts.map((post) =>
              <div className="card bg-base-100 image-full w-[494px] justify-center shadow-sm ">
                <figure>
                  <img
                    src={post.image}
                    alt="" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.shortDesc}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/singlePost/${post._id}`} ><button className="btn btn-primary">Read More</button></Link>
                  </div>
                </div>
              </div>
            )}
          </div>} */}
        </div>
        {activeTab === "Users" && <div className='bg-[#d8d8aa] text-white rounded-lg m-4 p-4'>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>createdAt</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              {allUsers.map((user, index) =>
                <tbody>
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.profilePic}
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="">{user.email}</span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}</td>
                    <th className='flex flex-col  items-center'>
                      {user.IsBlocked === false ? <button className="w-20 btn btn-ghost btn-xs text-red-500" onClick={() => blockUser(user._id)}>Block</button> :
                        <button className="w-20 btn btn-ghost btn-xs text-green-600" onClick={() => unBlockUser(user._id)}>UnBlock</button>}
                      <button className=" btn btn-ghost btn-xs" onClick={() => deleteUser(user._id)}>delete</button>
                    </th>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>}
        {activeTab === "Posts" && <div className='bg-[#d8d8aa] text-white rounded-lg m-4 p-4'>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>SrNo</th>
                  {/* <th>Post  image</th> */}
                  <th>PostedBy</th>
                  <th>Category</th>
                  <th>createdAt</th>
                  {/* <th>No post</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              {activeTab === "Posts" && posts.map((post, index) => (
                <tbody>
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={post.image}
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{post.username}</div>

                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm">{post.categories}</span>
                    </td>
                    <td>{new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => deleteSelectedPost(post._id)}>delete</button>
                    </th>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>}
    {activeTab === "Settings" && <EditUserProfile/> }
      </div>
    </div>
  )
}

export default AdminDashBoard