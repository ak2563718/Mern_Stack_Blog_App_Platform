import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import  Home  from './Components/PostComponents/Home'
import Login from './Components/UserComponent/Login'
import Signup from './Components/UserComponent/Signup'
import ForgetPassword from './Components/UserComponent/ForgetPassword'
import OtpVerification from './Components/UserComponent/OtpVerification'
import ResetPassword from './Components/UserComponent/ResetPassword'
import AdminPage from './Components/PostComponents/AdminPage'
import RoughNavbar from './Components/UserComponent/RoughNavbar'
import ProfileLayout from './Components/Profile/ProfileLayout'
import { BlogSection } from './Components/Profile/SideNavItems/Blog'
import  LikesSection  from './Components/Profile/SideNavItems/Likes'
import { ViewsSection } from './Components/Profile/SideNavItems/View'
import { CommentsSection } from './Components/Profile/SideNavItems/Comment'
import AddBlog from './Components/PostComponents/AddBlog'
import Uploadimage from './Components/PostComponents/Uploadimage'
import { BlogOverview } from './Components/PostComponents/BlogOverview'
import CommentField from './Components/PostComponents/Comment'
import CategoryFilter from './Components/Category/Categoryfilter'
import EditBlog from './Components/PostComponents/EditBlog'
import AddProfile from './Components/Profile/SideNavItems/Addprofile'
import { ProfilePic } from './Components/Profile/ProfilePic'
import ProfilePicdemo from './Components/Profile/ProfilePicdemo'
import About from './Components/PostComponents/About'
import ProgressBar from './Components/UserComponent/ProgressBar'
import CreateProfile from './Components/Profile/CreateProfile'
import { ViewProfile } from './Components/Profile/ViewProfile'


function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    
      {/* <Route path='/addpost' element={<CreatePost/>}/> */}
     
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path='/verify-otp' element={<OtpVerification/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/blog/:id' element={<BlogOverview/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/testnav' element={<RoughNavbar/>}/>
       <Route path='/profile/blog/addblog' element={<AddBlog/>}/>
      <Route path='/testupload' element={<Uploadimage/>}/>
      <Route path='/comment' element={<CommentField/>}/>
      <Route path='/category' element={<CategoryFilter/>}/>
      <Route path='/addprofile' element={<AddProfile/>}/>
      <Route path='/profilepic' element={<ProfilePic/>}/>
      <Route path='/demo'  element={<ProfilePicdemo/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/progressbar' element={<ProgressBar/>}/>
      <Route path='/createprofile' element={<CreateProfile/>}/>
      <Route path='/viewprofile/:id' element={<ViewProfile/>}/>

       <Route path='profile' element={<ProfileLayout/>}>
       <Route path='blog' element={<BlogSection/>}/>
       <Route path='/profile/blog/editblog/:id' element={<EditBlog/>}/>
       
       <Route path='likes' element={<LikesSection/>}/>
       <Route path='views' element={<ViewsSection/>}/>
       <Route path='comments' element={<CommentsSection/>}/>
      </Route>
      </Route>
      </>
    )
  )

  return (
  <RouterProvider router={router}>
  </RouterProvider>
  )
}

export default App