import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

const Settings = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  // const [userData, setUserData] = useState()
  const [value,setvalue] = useState({address:''})
  const [Profile, setProfile] = useState()

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-info", { headers });
      setProfile(response.data);
      setvalue({address: response.data.address});
      // console.log(userData);
    };
    fetch();
  }, []);

  const change = (e) => {
    const {name,value} = e.target;
    setvalue([...value, {[name]: value}]);
  }

  const submitAddress = async() =>{
    const response = await axios.put("http://localhost:1000/api/v1/update-address", value, {headers});
    console.log(response.data);
    setvalue({address: response.data.address});
  }
  
  return (
   <>
    {/* {!Profile && (
      <div className='w-full h-screen flex items-center justify-center'>
        <Loader/>
        </div>
    )
    } */}
    {Profile && (
      <div className='h-[100%] p-0 md:p-4 text-zinc-100 bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'> Settings </h1>
        <div className='flex gap-12'>
          <div className=''>
            <label htmlFor=''>Username</label>
            <p className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'>{Profile.username}</p>
          </div>
          <div className=''>
            <label htmlFor=''>Email</label>
            <p className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'></p>
          </div>
        </div>
        <div className='flex flex-col mt-4'>
          <label htmlFor=" " >Address:</label>
          <textarea className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'
          rows={5} placeholder='Address' name='address' value={value.address} onChange={change}></textarea>
          <button className='bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded mt-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105' onClick={submitAddress}>Update</button>
        </div>
      </div>
    )}
   </>
  )
}

export default Settings
