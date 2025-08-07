import React, { useRef ,useState} from 'react'
import { useAuth } from '../Context/AuthContext.jsx';

function WritePost() {
const {username} = useAuth()
 const userId = window.localStorage.getItem("userID");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(userId);

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
                    value={image}
                    onChange={(e) => { setImage( e.target.files[0])
                    }}
                />
                <button
                    type="button"
                    onClick={handleFileClick}
                    className="btn text-[#a0a05f] bg-base-100 w-fit"
                >
                    Upload Cover Image
                </button>
                <input type="text" placeholder="Blog Title" className="input  w-[400px] md:w-full" value={title} onChange={(e)=>setTitle(e.target.value)} />
                {/* <input type="text" placeholder="Slug (optional)" className="input w-full" /> */}
                <select className="select w-[400px] md:w-full" value={cat} onChange={(e)=>setCat(e.target.value)}>
                    <option   >Select Category</option>
                    <option>All</option>
                    <option>Web Development</option>
                    <option>Development</option>
                    <option>Search Engines</option>
                    <option>Marketing</option>
                    <option>Databases</option>
                </select>
                <input type="text" placeholder="Short Description" className="input w-[400px] md:w-full" value={shortDesc} onChange={(e)=>setShortDesc(e.target.value)} />
                <textarea placeholder="write your blog" className="textarea w-[400px] md:w-full h-[300px]" value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>


            </div>
        </div>
    )
}

export default WritePost