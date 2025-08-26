import React from 'react'
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { MdOutlineRemoveRedEye } from "react-icons/md";


function RecentPosts({ posts }) {
  console.log(posts)
  return (

    <div className='md:w-[300px] mb-4 '>
      <ul className="list bg-base-100 rounded-2xl shadow-md p-4">
        <li className=" mb-2 text-center bg-[#bbbb8e] font-semibold text-white rounded-xl">Recent Posts</li>
        {posts.slice(0,3).map((post) => (
          <li className="list-row text-[#b1b16e]">
            <div><img className="size-10 rounded-full" src={post.postedBy?.profilePic} /></div>
            <div>
              <div>{post.username}</div>
              <div className="text-xs uppercase font-semibold opacity-60">{post.shortDesc}</div>
            </div>
            <p className="list-col-wrap text-xs">
              "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
            </p>
            <div className="flex items-center gap-1 justify-between m-2 text-[12px]">
              <div className='flex items-center gap-1'>
                 <Heart  className='size-[14px]'/>
                {post.likes.length}
              </div>
              <div className='flex items-center gap-1'>
               <MessageCircle   className='size-[14px]' />
                {post.comments.length}
              </div>
              <div className='flex items-center gap-1'>
                  <MdOutlineRemoveRedEye />
                {post.views}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentPosts