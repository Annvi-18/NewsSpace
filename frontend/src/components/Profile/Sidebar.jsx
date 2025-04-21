import React from 'react'
import hero from "../Profile/hero.jpg"
import { Link } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
// import { authActions } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({data}) => {
  const history = useNavigate()
     const role = useSelector((state)=>state.auth.role);
  const dispatch = useDispatch()
  return (
    <div className='bg-white/80 backdrop-blur-sm h-[100%] p-6 rounded-xl shadow-lg flex flex-col items-center justify-between transform transition duration-500 hover:scale-[1.02]'>
      <div className='flex flex-col items-center'>
        <img src={hero} className='h-[15vh] rounded-full shadow-md transform transition duration-500 hover:scale-110' />
        <p className='mt-4 text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'>
          {data.username}
        </p>
        <p className='mt-2 text-lg text-zinc-600'>{data.email}</p>
        <div className='w-full mt-6 h-[1px] bg-gradient-to-r from-pink-200 to-purple-200 hidden lg:block'></div>
      </div>

      {role === "user" && (
        <div className='w-full flex-col items-center justify-center space-y-3 md:flex hidden'>
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
               <div className='w-full items-center justify-between h-auto flex flex-col gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg'>
               <Link to={"/profile"} 
                   className='bg-gradient-to-r from-pink-100 to-purple-100 text-zinc-700 font-semibold w-full py-3 text-center rounded-lg hover:from-pink-200 hover:to-purple-200 transition-all duration-300 shadow-md hover:shadow-lg'>
                   All Orders
                 </Link>
                 <Link to={"/profile/add-book"}
                   className='bg-gradient-to-r from-purple-100 to-blue-100 text-zinc-700 font-semibold w-full py-3 text-center rounded-lg hover:from-purple-200 hover:to-blue-200 transition-all duration-300 shadow-md hover:shadow-lg'>
                   Add Books
                 </Link>
             </div>
          )
          }

      <button 
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear();
          history("/")
          window.location.href = "/login";
        }}
        className='bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 w-full py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-6 transform hover:scale-105'
      >
        LogOut
      </button>
    </div>
  )
}

export default Sidebar
