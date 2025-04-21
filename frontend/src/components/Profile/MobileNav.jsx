import React from 'react'
// import Link from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
// import { authenticate } from '../../../../backend/routes/userAuth'

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
  return (
    <>
    {role === "user" && (
        <div className='w-full items-center justify-between h-auto md:hidden lg:hidden flex flex-col gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg'>
      <Link to={"/profile"} 
          className='bg-gradient-to-r from-pink-100 to-purple-100 text-zinc-700 font-semibold w-full py-3 text-center rounded-lg hover:from-pink-200 hover:to-purple-200 transition-all duration-300 shadow-md hover:shadow-lg'>
          Favourites
        </Link>
        <Link to={"/profile/orderhistory"}
          className='bg-gradient-to-r from-purple-100 to-blue-100 text-zinc-700 font-semibold w-full py-3 text-center rounded-lg hover:from-purple-200 hover:to-blue-200 transition-all duration-300 shadow-md hover:shadow-lg'>
          Order History
        </Link>
        <Link to={"/profile/settings"}
          className='bg-gradient-to-r from-blue-100 to-cyan-100 text-zinc-700 font-semibold w-full py-3 text-center rounded-lg hover:from-blue-200 hover:to-cyan-200 transition-all duration-300 shadow-md hover:shadow-lg'>
          Settings
        </Link>
    </div>
    )}
    {role === "admin" && (
         <div className='w-full items-center justify-between h-auto md:hidden lg:hidden flex flex-col gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg'>
         <Link to={"/profile"} 
             className='bg-gradient-to-r from-pink-100 to-purple-100 text-zinc-700 font-semibold w-full py-3 text-center rounded-lg hover:from-pink-200 hover:to-purple-200 transition-all duration-300 shadow-md hover:shadow-lg'>
             All Orders
           </Link>
           <Link to={"/profile/orderhistory"}
             className='bg-gradient-to-r from-purple-100 to-blue-100 text-zinc-700 font-semibold w-full py-3 text-center rounded-lg hover:from-purple-200 hover:to-blue-200 transition-all duration-300 shadow-md hover:shadow-lg'>
             Add Books
           </Link>
       </div>
    )
    }
      </>
  )

}

export default MobileNav
