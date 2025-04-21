import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard'

const Favourites = () => {
  const [Favouritebooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get("http://localhost:1000/api/v1/getAllFavs", {headers});
      setFavouriteBooks(response.data.data)
    }
    fetch();
  }, [Favouritebooks])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Favouritebooks && Favouritebooks.map((items, i) => (
        <div key={i} className="transform transition duration-500 hover:scale-105">
          <BookCard data={items} favourite={true}/>
        </div>
      ))}
      {(!Favouritebooks || Favouritebooks.length === 0) && (
        <div className="col-span-full text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600">No favorites yet!</h2>
          <p className="text-gray-500 mt-2">Start adding some books to your favorites.</p>
        </div>
      )}
    </div>
  )
}

export default Favourites
