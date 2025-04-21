import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

const AllBooks = () => {
    const [Data, setData] = useState();
    useEffect(()=>{
        const fetch = async()=>{
          const response = await axios.get("http://localhost:1000/api/v1/getallbooks");
          setData(response.data.data);
        };  
        fetch();
    },[]);
  return (
    <div className="bg-gradient-to-br from-rose-100 via-violet-100 to-cyan-100 items-center text-zinc-900 px-10 py-8">
      <div className='animate-fadeIn bg-gradient-to-br from-pink-100/50 via-yellow-100/50 to-blue-100/50 rounded-xl shadow-lg px-8'>
        <h4 className='text-5xl font-bold tracking-tight animate-slideUp'>
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
            All Books
          </span>
          <span className="block mt-2 text-xl text-zinc-600 font-normal animate-slideUp animation-delay-200 hover:text-pink-500 transition-colors duration-300">
            Explore our complete collection of books
          </span>
        </h4>

        {!Data && (
          <div className='flex items-center justify-center min-h-[200px] animate-pulse'>
            <Loader/>
          </div>
        )}

        <div className='my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-slideUp animation-delay-400'>
          {Data && Data.map((items, i) => (
            <div key={i} className="transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1 animate-[fadeIn_0.5s_ease-in_forwards]" style={{animationDelay: `${i * 0.1}s`}}>
              <BookCard data={items}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllBooks
