import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { useParams } from 'react-router-dom'

const AllOrders = () => {
  const [option, setOption] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    // bookid: id
  }
  const submitChanges = async(i)=>{
    const id = AllOrders[i]._id;
    const response = await axios.put(`http://localhost:1000/api/v1/updatestatus/${id}`, value, {headers});
    alert(response.data.message);
    console.log(response);
  }
  const [AllOrders, setAllOrders] = useState([]);
  const [value, setValue] = useState({
    status: ""
  });
  useEffect(() => {
    const fetch = async() =>{
      const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", {headers});
      console.log(response);
      setAllOrders(response.data.data);
    }
    fetch();
  }, [])
  const change = (e) =>{
    const {name, value} = e.target;
    setValue({ status: value});
  }
  const setOptionButton = (i) => {
    setOption(i);
  }
  return (
    <>
    {!AllOrders && <div className='h-[100%] flex items-center justify-center'> <Loader/> </div>
     }
     {AllOrders && AllOrders.length === 0 && <div className='h-[100%] flex items-center justify-center'> <h1 className='text-3xl font-bold'>No Orders</h1> </div>}
      {AllOrders && AllOrders.length !== 0 && <div className='h-[100%] flex items-center justify-center'>
     
<table className="w-[90%] mx-auto mt-6 border-collapse shadow-lg rounded-xl overflow-hidden">
  <thead>
    <tr className="bg-gray-100 text-left text-gray-700">
      <th className="p-4 border-b border-gray-300">User</th>
      <th className="p-4 border-b border-gray-300">Book</th>
      <th className="p-4 border-b border-gray-300">Price</th>
      <th className="p-4 border-b border-gray-300">Status</th>
    </tr>
  </thead>
  <tbody>
    {AllOrders.map((item, i) => (
      <tr
        key={i}
        className="transition-all duration-300 ease-in-out hover:bg-blue-50 hover:scale-[1.01]"
      >
        <td className="p-4 border-b border-gray-200">{item.user.name}</td>
        {/* <td className="p-4 border-b border-gray-200">{item.book.title}</td>
        <td className="p-4 border-b border-gray-200">₹{item.book.price}</td> */}
        <td className="p-4 border-b border-gray-200">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300" onClick={() => {setOptionButton(-1); submitChanges(i)}}>
    
            {item.status === "Order Placed" ? (
              <div className='text-yellow-200'>{item.status}</div>) : (<div className='text-red-500 font-bold'>{item.status}</div>)}
          </button>
          <div className={`${option === i ? "block" : "hidden"}`}>
            <select className="border border-gray-300 rounded-lg p-2 mt-2" name='status' onChange={change} value={value.status}>
                         
{
  [
    "Order Placed",
    "Order Shipped",
    "Order Delivered",
    "Order Cancelled",
    "Order Returned",
  ].map((items,i)=>{
    return(
      <option value={items} key={i}>{items}</option>
    )
  })
}
            </select>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

     
      </div>}
    </>
  )
}

export default AllOrders;
