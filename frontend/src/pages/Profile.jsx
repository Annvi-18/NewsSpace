import React, { useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/Profile/MobileNav'

const Profile = () => {
  const [Profile, setProfile] = useState();
  // const isLoggedIn = useSelector();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  console.log(headers);
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get("http://localhost:1000/api/v1/get-user-info", {headers});
      setProfile(response.data);
      console.log(Profile);
    };
    fetch();
  },[])
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-100 via-violet-100 to-cyan-100'>
      {!Profile && (
        <div className='w-full h-screen flex items-center justify-center'>
          <Loader/>
        </div>
      )}
      {Profile && (
        <div className='flex flex-col md:flex-row gap-8 px-4 md:px-12 py-8'>
          <div className='w-full md:w-1/4 h-auto lg:w-1/5 lg:h-screen'>
            <Sidebar data={Profile}/>
            <MobileNav/>
          </div>
          <div className='w-full md:w-3/4 lg:w-4/5 bg-white/50 rounded-xl shadow-lg backdrop-blur-sm p-6'>
            <Outlet/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
