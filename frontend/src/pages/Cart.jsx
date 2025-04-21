import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/v1/getAllinCart', {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setCartItems(response.data.data);
      calculateTotal(response.data.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  const handleRemoveItem = async (bookId) => {
    try {
      await axios.delete("http://localhost:1000/api/v1/deleteFromCart", {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
          bookid: bookId
        }
      });
      fetchCartItems(); // Refresh cart after removal
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-100 via-violet-100 to-cyan-100 min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-zinc-800">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center text-zinc-600 text-xl">Your cart is empty</div>
        ) : (
          <>
            <div className="overflow-x-auto bg-white/50 rounded-xl shadow-lg backdrop-blur-sm">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-pink-100/80 to-blue-100/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-zinc-800">Book</th>
                    <th className="px-6 py-4 text-left text-zinc-800">Title</th>
                    <th className="px-6 py-4 text-left text-zinc-800">Price</th>
                    <th className="px-6 py-4 text-left text-zinc-800">Quantity</th>
                    <th className="px-6 py-4 text-left text-zinc-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b border-zinc-200 group">
                      <td className="px-6 py-4 group-hover:bg-white/30 transition duration-200">
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="h-24 w-20 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
                        />
                      </td>
                      <td className="px-6 py-4 text-zinc-800 font-medium group-hover:bg-white/30 transition duration-200">{item.title}</td>
                      <td className="px-6 py-4 text-zinc-800 group-hover:bg-white/30 transition duration-200">${item.price}</td>
                      <td className="px-6 py-4 group-hover:bg-white/30 transition duration-200">
                        <div className="flex items-center gap-2">
                          <button 
                            className="bg-gradient-to-r from-blue-400 to-purple-400 text-white w-8 h-8 rounded-full
                              hover:from-blue-500 hover:to-purple-500 transition duration-300 transform hover:scale-105"
                            onClick={() => {
                              if (item.quantity > 1) {
                                const updatedItems = cartItems.map(cartItem => 
                                  cartItem._id === item._id 
                                    ? {...cartItem, quantity: cartItem.quantity - 1}
                                    : cartItem
                                );
                                setCartItems(updatedItems);
                                calculateTotal(updatedItems);
                              }
                            }}
                          >
                            -
                          </button>
                          <span className="text-zinc-800 w-8 text-center">{item.quantity || 1}</span>
                          <button 
                            className="bg-gradient-to-r from-blue-400 to-purple-400 text-white w-8 h-8 rounded-full
                              hover:from-blue-500 hover:to-purple-500 transition duration-300 transform hover:scale-105"
                            onClick={() => {
                              const updatedItems = cartItems.map(cartItem =>
                                cartItem._id === item._id
                                  ? {...cartItem, quantity: (cartItem.quantity || 1) + 1}
                                  : cartItem
                              );
                              setCartItems(updatedItems);
                              calculateTotal(updatedItems);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 group-hover:bg-white/30 transition duration-200">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-4 py-2 rounded-lg
                            hover:from-pink-500 hover:to-red-500 transition duration-300 transform hover:scale-105"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <div className="bg-white/50 p-8 rounded-xl shadow-lg backdrop-blur-sm w-80">
                <h2 className="text-2xl font-bold mb-4 text-zinc-800">Cart Summary</h2>
                <div className="flex justify-between text-lg">
                  <span className="text-zinc-600">Total:</span>
                  <span className="font-bold text-zinc-800">${total.toFixed(2)}</span>
                </div>
                <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg
                  hover:from-blue-600 hover:to-purple-600 transform transition duration-300 hover:scale-105 font-medium">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 