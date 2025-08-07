import React from 'react'

function MainCategories() {
  return (
    <div className=' rounded-none my-4 bg-base-100 p-2 '>
        <h1 className='text-center bg-[#bbbb8e] font-semibold text-white rounded-xl'>Categories</h1>
        <div className='p-4'>
            <ul>
                <li>All</li>
                <hr />
                <li>Web Development</li>
                <hr />
                <li> Development</li>
                <hr />
                <li> Marketing</li>
                <hr />
                <li> Search Engine</li>
                <hr />
                <li>Databases</li>
                <hr />
            </ul>
        </div>
    </div>
  )
}

export default MainCategories