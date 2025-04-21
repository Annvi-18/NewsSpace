import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const OrderHistory = () => {
  const[orderhistory, setorderhistory] = useState([])
  const headers = {
    headers: {
      id: localStorage.getItem("id"),

      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  useEffect(()=>{
    const fetch = async() =>{
      const resp = await axios.get("http://localhost:1000/api/v1/get-order-history", headers)
      setorderhistory(resp.data.data)
    }
    fetch()
  },[])
  
    
  return (
    <>
    {!orderhistory && <Loader/>}
    {orderhistory && orderhistory.length === 0 && 
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 p-6 flex justify-center items-center">
      <div className="max-w-4xl bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl text-zinc-800 transform transition duration-500 hover:scale-[1.02]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">No Order History Found</h1>
          <img src="/empty-cart.png" alt="nothing" className="mx-auto w-64 h-64 opacity-60" />
        </div>
      </div>
    </div>
    }
    {orderhistory && orderhistory.length > 0 &&
      <div className="min-h-screen bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 p-6">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Order History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-pink-200 to-purple-200">
                <tr>
                  <th className="p-4 font-semibold">Sr. No.</th>
                  <th className="p-4 font-semibold">Book</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Mode</th>
                </tr>
              </thead>
              <tbody>
                {orderhistory.map((order, index) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-white/60">
                    <td className="p-4">{index + 1}</td>
                    <Link to={`/get-book-by-id/${order.book._id}`}>{order.book.title}</Link>
                    <td className="p-4">{order.book.description.slice(0,40)}</td>
                    <td className="p-4">₹{order.book.price}</td>
                    <td className="p-4">{order.status || 'Pending'}</td>
                    <td className="p-4">{order.mode || 'Online'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    }
    </>

  )
  }


export default OrderHistory
