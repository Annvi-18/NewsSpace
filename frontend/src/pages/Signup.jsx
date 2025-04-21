import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Signup = () => {
    const [values,setvalues] = useState({
        username: "",
        email:"",
        password:"",
        address:""
    });
    const navigate = useNavigate();
    const change =(e)=>{
        const {name,value} = e.target;
        setvalues({...values, [name]:value});
    }
    const submit = async()=>{
        try {
            if(values.username === "" || values.email === "" || values.password  === "" || values.address === ""){
                alert("all fields reqd");
            }
            else{
                const response = await axios.post("http://localhost:1000/api/v1/signup",values);
                alert(response.data.message);
                navigate("/login")
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
  return (
    <div className="bg-gradient-to-br from-rose-100 via-violet-100 to-cyan-100 min-h-screen px-4 py-8 flex items-center justify-center">
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <h1 className="text-3xl font-bold text-zinc-800 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Sign Up</h1>
        <div className="mt-6">
            <div>
                <label htmlFor="username" className="text-zinc-700 font-medium">
                    Username
                </label>
                <input
                  type="text"
                  className="w-full mt-2 bg-white/70 text-zinc-800 p-3 rounded-lg outline-none border border-zinc-200 focus:border-purple-400 transition duration-200"
                  placeholder="Enter your username"
                  name="username"
                  required
                  value={values.username}
                  onChange={change}
                />
            </div>
            <div className="mt-4">
                <label htmlFor="email" className="text-zinc-700 font-medium">
                    Email
                </label>
                <input 
                  type="email"
                  className="w-full mt-2 bg-white/70 text-zinc-800 p-3 rounded-lg outline-none border border-zinc-200 focus:border-purple-400 transition duration-200"
                  placeholder="Enter your email"
                  name="email"
                  required
                  value={values.email}
                  onChange={change}
                />
            </div>
            <div className="mt-4">
                <label htmlFor="password" className="text-zinc-700 font-medium">
                    Password
                </label>
                <input 
                  type="password"
                  className="w-full mt-2 bg-white/70 text-zinc-800 p-3 rounded-lg outline-none border border-zinc-200 focus:border-purple-400 transition duration-200"
                  placeholder="Enter your password"
                  name="password"
                  required
                  value={values.password}
                  onChange={change}
                />
            </div>
            <div className="mt-4">
                <label htmlFor="address" className="text-zinc-700 font-medium">
                    Address
                </label>
                <textarea
                  rows="3"
                  className="w-full mt-2 bg-white/70 text-zinc-800 p-3 rounded-lg outline-none border border-zinc-200 focus:border-purple-400 transition duration-200"
                  placeholder="Enter your address"
                  name="address"
                  required
                  value={values.address}
                  onChange={change}
                />
            </div>
            
            <button 
              onClick={submit}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg
                hover:from-pink-600 hover:to-purple-600 transform transition duration-300 hover:scale-105 font-medium"
            >
              Sign Up
            </button>

            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="h-[1px] w-full bg-zinc-300"></div>
              <span className="text-zinc-500 px-4 font-medium">OR</span>
              <div className="h-[1px] w-full bg-zinc-300"></div>
            </div>

            <p className="text-center text-zinc-600 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-500 transition-all duration-300">
                Login
              </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Signup




// address
// : 
// "402, Sungrace,"
// email
// : 
// "annvi.22310578@viit.ac.in"
// password
// : 
// "something"
// username
// : 
// "Annvi18"