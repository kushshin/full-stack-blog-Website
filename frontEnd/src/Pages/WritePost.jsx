import React, { useRef } from 'react'

function WritePost() {
    const fileInputRef = useRef(null)

    const handleFileClick = () => {
        fileInputRef.current.click()
    }
    return (
        <div>
            <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a>Write</a></li>
                </ul>
            </div>
            <div className=' flex flex-col gap-y-4  px-12 md:px-32 py-4 text-[#a0a05f]'>
                <h1 className='text-center'>Create New Blog</h1>
                {/* <input type="file" className="file-input  w-[400px] md:w-full" />  */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                        console.log('Selected file:', e.target.files[0])
                    }}
                />
                <button
                    type="button"
                    onClick={handleFileClick}
                    className="btn text-[#a0a05f] bg-base-100 w-fit"
                >
                    Upload Cover Image
                </button>
                <input type="text" placeholder="Blog Title" className="input  w-[400px] md:w-full" />
                {/* <input type="text" placeholder="Slug (optional)" className="input w-full" /> */}
                <select className="select w-[400px] md:w-full">
                    <option disabled selected>Select Category</option>
                    <option>All</option>
                    <option>Web Development</option>
                    <option>Development</option>
                    <option>Search Engines</option>
                    <option>Marketing</option>
                    <option>Databases</option>
                </select>
                <input type="text" placeholder="Short Description" className="input w-[400px] md:w-full" />
                <textarea placeholder="write your blog" className="textarea w-[400px] md:w-full h-[300px]"></textarea>


            </div>
        </div>
    )
}

export default WritePost