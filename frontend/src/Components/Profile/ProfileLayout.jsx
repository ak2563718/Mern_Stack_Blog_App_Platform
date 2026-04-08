import React, { useEffect } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { Sidebar } from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostByUser } from "@/redux/actions/postAction";

export default function ProfileLayout() {
  const navigate=useNavigate()
  const {islogin}=useSelector((state)=>state.user)
 
  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch(getPostByUser())
  },[])

 if(!islogin) return null;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <ProfileHeader />

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Horizontal Navbar */}
        <Sidebar />

        {/* Page Content */}
        <main className="mt-6 w-full">
          <Outlet />
        </main>

      </div>
    </div>
  );
}