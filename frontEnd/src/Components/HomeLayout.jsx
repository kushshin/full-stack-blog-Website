import React from 'react'
import Navbar from '../Components/Navbar'
import {Outlet} from 'react-router-dom'
import Footer from '../Components/Footer'

function HomeLayout() {
  return (
    <div>
        <Navbar/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default HomeLayout