import React from 'react'



function AboutUs() {



  return (
    <div>
      <div className=' '>
        <h1 className='text-center m-4 text-[40px] font-bold text-[#bbbb8e]'>ABOUT</h1>
        <div className="breadcrumbs  text-[12px] md:text-sm  px-12 md:px-32 ">
          <ul className='text-[#bbbb8e] '>
            <li className='hover:text-[#818147]'><a href='/'>Home</a></li>
            <li className='hover:text-[#818147]'><a>About</a></li>
          </ul>
        </div>
        <div className='md:flex  items-center m-8'>
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D" alt="" className='rounded-2xl' />
          <p className='m-8 text-[#bbbb8e]'>Welcome to <span className='text-[24px] text-[#747431] font-semibold'>S</span><span className='font-semibold text-[20px] text-[#d4cac0]'>tack</span><span className='text-[24px] text-[#747431] font-semibold'>B</span><span  className='font-semibold text-[20px] text-[#d4cac0]'>its</span>, a space where ideas, technology, and creativity come together. Our mission is simple: to share knowledge, inspire innovation, and create a community of curious minds who love exploring the digital world.
            At Stackbits, we publish blogs on web development, design, technology trends, productivity, and career growth—all written to help readers learn, grow, and stay ahead in an ever-changing tech landscape. Whether you’re a student, a budding developer, or an experienced professional, you’ll find insights, tutorials, and stories that resonate with your journey.
            We believe that knowledge grows best when shared. That’s why Stackbits isn’t just a blog—it’s a platform for conversation, discovery, and collaboration. Our vision is to build a hub where technology enthusiasts and creative thinkers can connect, learn, and evolve together.
            At the heart of Stackbits is a passion for storytelling, simplicity, and value-driven content. Every article is crafted to spark curiosity, encourage learning, and leave you with something new to think about.
            So, grab a coffee and dive in—let’s explore ideas, one blog at a time.</p>
        </div>
      </div>

    </div>
  )
}

export default AboutUs