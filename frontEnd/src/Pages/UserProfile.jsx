import React from 'react'
import bgImage from '../../public/img/coverImage4.jpg'

function UserProfile() {
    return (
        <div>
            <div className='flex justify-between'>
                <div className='border-2' >
                    <div>
                        <div className="  bg-cover bg-center text-white  rounded-t-3xl w-[450px] h-[150px] md:w-[900px] md:h-[300px] flex flex-col items-center justify-center text-center mx-4 md:mx-8  mt-8 " style={{ backgroundImage: `url(${bgImage})` }}>
                            <div className=' w-[100px] h-[100px] rounded-full border-2 bg-gray-500 absolute  top-48  left-16  md:bottom-40 md:left-20'> </div>
                        </div>
                        <div className=' w-[450px] h-[150px] md:w-[900px]  md:h-[300px] bg-[#cfcf90] mx-4 md:mx-8 mb-8 rounded-b-3xl'></div>
                    </div>
                    <div>Allmy blogs</div>
                </div>
                <div className="border-2 w-[350px]">
                    <div className='border-2 m-8'>
                        <h1>People also viewed</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile