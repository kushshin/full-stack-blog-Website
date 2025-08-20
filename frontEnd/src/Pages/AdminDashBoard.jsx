import React, { useEffect } from 'react'
import { fetchPosts } from '../Redux/postSlice'
import { fetchUsers } from '../Redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { MdDashboard } from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { FaUser } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5";

function AdminDashBoard() {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)
  const { users } = useSelector((state) => state.users)
  const allUsers = users.filter((user) => user.role === "user")
  const likes = posts.map((post) => post.likes)
  const comments = posts.map((post) => post.comments)


  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchPosts())
  }, [dispatch])
  return (
    <div className='md:flex mx-8  gap-4 my-4 '>
      <div className=' w-full md:w-[250px] bg-base-100 rounded-2xl'>
        <div>
            <div className='  font-semibold text-center'>ADMIN</div>
          <ul className='flex flex-wrap justify-center gap-3 md:flex md:flex-col  m-8 md:gap-y-8 md:justify-start'>
            <li className='flex items-center gap-2'><MdDashboard /><span>DashBoard</span></li>
            <li className='flex items-center gap-2'><BsFilePost /><span>Posts</span></li>
            <li className='flex items-center gap-2'><FaComments /><span>Comments</span></li>
            <li className='flex items-center gap-2'><FaUser /><span>Users</span></li>
            <li className='flex items-center gap-2'><IoSettingsSharp />Settings<span></span></li>
          </ul>
        </div>
      </div>
      <div className=' flex-1  bg-base-100 rounded-2xl ' >
        {/* right */}
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
        <div className='bg-[#d8d8aa] text-white rounded-lg m-4 p-4'>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>

                  <th>Sr No</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>createdAt</th>
                  <th>Actions</th>

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
                      <span className="badge badge-ghost badge-sm">{user.email}</span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">delete</button>
                    </th>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className='bg-[#d8d8aa] text-white rounded-lg m-4 p-4'>
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
              {posts.map((post, index) => (
                <tbody>
                  <tr>
                    <th>{index + 1}</th>
                    {/* <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th> */}
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
                      <button className="btn btn-ghost btn-xs">delete</button>
                    </th>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard