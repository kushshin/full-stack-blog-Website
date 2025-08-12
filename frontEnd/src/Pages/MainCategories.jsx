import React,{useState} from 'react'

function MainCategories() {
  const[categories,setCategories] = useState(["All","Web Development","Development","Marketing","Search Engine","DataBases"])



  return (
    <div className=' rounded-none my-4 bg-base-100 p-2 '>
        <h1 className='text-center bg-[#bbbb8e] font-semibold text-white rounded-xl'>Categories</h1>
        <div className='p-4'>
            <ul>
              {categories.map((category)=>(
                    <li onClick={()=>handleCategory(category)}>{category}</li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default MainCategories