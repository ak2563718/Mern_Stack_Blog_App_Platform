import React from 'react'
import Navbar from './UserComponent/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './UserComponent/Footer'
import { useSelector } from 'react-redux'
import Loader from './UserComponent/Loader'

function Layout() {

 
  return (
   <>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default Layout