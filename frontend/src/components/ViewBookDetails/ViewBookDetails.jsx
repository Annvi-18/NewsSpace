import React from 'react'
import { useState } from 'react';
import { GrLanguage } from "react-icons/gr";
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import Loader from '../Loader/Loader';
// import { FaWheatAwnCircleExclamation } from 'react-icons/fa6';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ViewBookDetails = () => {
  const navigate = useNavigate();
    const {id} = useParams();
    const [Data,setData] = useState({});
    useEffect(()=>{
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data); // Update state with fetched data
                console.log("Data set successfully");
              } catch (error) {
                console.error("Error fetching book:", error);
              }
        };  
        fetch();
        // console.log(Data.title);
    },[]);

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id
    }

    const handleFavourite = async()=>{
       const response = await axios.put("http://localhost:1000/api/v1/addToFavourites",{},{headers});
       alert(response.data.message);
    }

    const deleteperm = async () =>{
      const response = await axios.delete("http://localhost:1000/api/v1//deletebook", {headers});
      alert(response.data.message);
      navigate("/all-books")
    }

    const handleCart = async() => {
      try {
        const response = await axios.put("http://localhost:1000/api/v1/addToCart", {}, {headers});
        alert(response.data.message);
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart. Please try again.");
      }
    }

    const handleRemoveFromCart = async() => {
      try {
        const response = await axios.delete("http://localhost:1000/api/v1/deleteFromCart", {headers});
        alert(response.data.message);
      } catch (error) {
        console.error("Error removing from cart:", error);
        alert("Failed to remove from cart. Please try again.");
      }
    }

    const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
    const role = useSelector((state)=> state.auth.role)
    console.log(isLoggedIn);
    console.log(role);

  return (
    <>
      {Data && (
        <div className='min-h-screen bg-gradient-to-br from-rose-50 via-violet-50 to-cyan-50 px-4 md:px-12 py-8'>
          <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start transform transition-all duration-500 hover:scale-[1.02]'>
            <div className='w-full lg:w-3/6 transform transition-all duration-500 hover:scale-[1.02]'>
              <div className='flex lg:flex-row flex-col justify-around bg-gradient-to-br from-pink-50 via-blue-50 to-cyan-50 p-12 rounded-xl shadow-lg backdrop-blur-sm hover:from-pink-100 hover:via-blue-100 hover:to-cyan-100 transition-all duration-500 hover:scale-[1.02]'>
                <img 
                  src={Data.url} 
                  className='h-[50vh] lg:h-[70vh] rounded-lg shadow-xl transition-all duration-500 hover:scale-110'
                /> 
                {isLoggedIn === true && role === "user" && (
                  <div className='flex items-center justify-start flex-row lg:flex-col gap-4 mt-6 lg:mt-0 transform transition-all duration-500 hover:scale-[1.02]'>
                    <button 
                      className='bg-gradient-to-r from-pink-200 to-red-200 text-rose-50 rounded-full p-4 hover:from-pink-300 hover:to-red-300 transition-all duration-500 hover:scale-125 shadow-md' 
                      onClick={handleFavourite}
                    >
                      <FaHeart className="text-2xl" />
                    </button>
                    <button 
                      className='bg-gradient-to-r from-blue-200 to-purple-200 text-violet-50 rounded-full p-4 hover:from-blue-300 hover:to-purple-300 transition-all duration-500 hover:scale-125 shadow-md' 
                      onClick={handleCart}
                    >
                      <FaShoppingCart className="text-2xl" />
                    </button>
                  </div>
                )}

                {isLoggedIn === true && role === "admin" && (
                  <div className='flex items-center justify-start flex-row lg:flex-col gap-4 mt-6 lg:mt-0 transform transition-all duration-500 hover:scale-[1.02]'>
                    <Link to={`/updateBook/${id}`}
                      className='bg-gradient-to-r from-green-200 to-teal-200 text-emerald-50 rounded-full p-4 hover:from-green-300 hover:to-teal-300 transition-all duration-500 hover:scale-125 shadow-md'
                    >
                      <MdEditSquare className="text-2xl" />
                    </Link>
                    <button 
                      className='bg-gradient-to-r from-red-200 to-orange-200 text-rose-50 rounded-full p-4 hover:from-red-300 hover:to-orange-300 transition-all duration-500 hover:scale-125 shadow-md'
                      onClick={deleteperm}
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className='w-full lg:w-3/6 bg-gradient-to-br from-pink-50 via-blue-50 to-rose-50 p-8 rounded-xl shadow-lg backdrop-blur-sm hover:from-pink-100 hover:via-blue-100 hover:to-rose-100 transition-all duration-500 hover:scale-[1.02]'>
              <h1 className='text-4xl font-bold text-zinc-600 mb-2 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent transition-all duration-500 hover:scale-105'>{Data.title}</h1>
              <p className='text-zinc-400 text-lg mb-4 transition-all duration-500 hover:scale-105'>{Data.author}</p>
              <p className='text-zinc-500 text-lg mb-6 leading-relaxed transition-all duration-500 hover:scale-105'>{Data.desc}</p>
              <div className='flex items-center gap-2 text-zinc-400 mb-6 transition-all duration-500 hover:scale-105'>
                <GrLanguage className="text-xl" /> 
                <span className="text-lg">{Data.langauge}</span>
              </div>
              <p className='text-3xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent transition-all duration-500 hover:scale-110'>
                ${Data.price}
              </p>
            </div>
          </div>
        </div>
      )}

      {!Data && (
        <div className='min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-cyan-50 flex items-center justify-center'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default ViewBookDetails
