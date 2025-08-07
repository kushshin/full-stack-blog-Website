import React from 'react'

function AllPosts() {
  return (
    <div>
        <div className="card lg:card-side bg-base-100 shadow-sm mt-4 mb-4 rounded-none">
  <figure>
    <img
      src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D"
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn  bg-[#bbbb8e] text-white">Read More</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default AllPosts