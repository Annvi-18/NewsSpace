// import React from 'react';
// import Hero from '../Home/Hero';
// import RecentlyAdded from '../Home/RecentlyAdded';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const BookCard = ({data,favourite}) => {
//   const headers = {
//       id: localStorage.getItem("id"),
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       bookid: data._id
//   }
//   const handleRemovedBook = async()=>{
//     try{
//       console.log(headers);
//     const response = await axios.put("http://localhost:1000/api/v1/deleteFromFavs",{},{headers});
//     console.log(response);
//     }
//     catch(err){
//       console.log(err);
//     }
//   }
    
//     // console.log(data);
//   return (
//     <>
//     <Link to={`/view-book-details/${data._id}`}>
//       <div className='bg-zinc-800 rounded p-4 flex flex-col'>
//         <div className='bg-zinc-900 rounded flex items-center justify-center'>
//             <img src={data.url} alt='' className='h-[25vh] '/>
//         </div>
//         <h2 className='mt-4 text-xl text-zinc-200 font-semibold '>{data.title}</h2>
//         <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
//         <p className='mt-2 text-zinc-400 font-semibold text-xl'>{data.price}</p>
       
//       </div>
//     </Link>
//     {favourite && (
//        <button className='bg-yellow-100 text-s px-4 py-2 rounded border border-yellow-500 text-yellow-500'
//        onClick={handleRemovedBook}>remove from favs</button>
//     )}
//     </>
//   )
// } 

// export default BookCard




import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  

  const handleRemovedBook = async () => {
    try {
      // console.log("Request Headers:", headers);
      
      const response = await axios.delete(
        "http://localhost:1000/api/v1/deleteFromFavs",
        {headers: {
          "Content-Type" : "application/json",
          id: localStorage.getItem("id"), // Ensure value exists
          authorization: `Bearer ${localStorage.getItem("token")}`,
          bookid: data._id // Ensure token exists
        },         
         // Ensure book ID exists
      }// Headers should be inside the config object
      );

      console.log("Response:", response.data.message);
    } catch (err) {
      console.error("Error Removing Book:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 rounded-xl p-6 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:from-pink-200 hover:via-yellow-200 hover:to-blue-200">
          <div className="bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-md">
            <img 
              src={data.url} 
              alt="" 
              className="h-[28vh] transform transition duration-500 hover:scale-110 hover:rotate-2" 
            />
          </div>
          <div className="transform transition duration-300 translate-y-0 hover:translate-y-[-4px]">
            <h2 className="mt-5 text-2xl text-zinc-800 font-bold truncate hover:text-pink-600 tracking-tight">{data.title}</h2>
            <p className="mt-3 text-lg text-zinc-600 font-medium hover:text-blue-600 italic">by {data.author}</p>
            <p className="mt-3 text-zinc-900 font-bold text-2xl hover:text-purple-600">${data.price}</p>
          </div>
        </div>
      </Link>

      {favourite && (
        <button
          className="bg-gradient-to-r from-pink-100 to-blue-100 text-base px-6 py-3 rounded-full 
          border-2 border-pink-400 text-pink-600 font-semibold
          transform transition duration-300 hover:from-pink-400 hover:to-blue-400 hover:text-white 
          hover:scale-105 hover:shadow-lg hover:border-transparent
          active:scale-95 mt-4 w-full"
          onClick={handleRemovedBook}
        >
          Remove from Favorites
        </button>
      )}
    </>
  );
};

export default BookCard;
