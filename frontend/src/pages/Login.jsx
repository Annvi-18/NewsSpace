import React from 'react'
// import { Link } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth';
import axios from "axios";
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [values,setvalues] = useState({
    username: "",
    email:"",
    password:"",
    address:""
});
const navigate = useNavigate();
const dispatch = useDispatch();
const change =(e)=>{
    const {name,value} = e.target;
    setvalues({...values, [name]:value});
}
const submit = async()=>{
    try {
        if(values.username === "" || values.password  === "" ){
            alert("all fields reqd");
        }
        else{
            const response = await axios.post("http://localhost:1000/api/v1/login",values);
            dispatch(authActions.login());
            dispatch(authActions.changeRole(response.data.role));
            // isse apneaap cart and profile chalu hojayega and login ho jayega 
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role",response.data.role);
          //  console.log(response.data);
            // navigate("/login")
            navigate("/profile");
        }
    } catch (error) {
        console.log(error.response.data.message);
    }
}
  return (
    <div className="bg-gradient-to-br from-rose-100 via-violet-100 to-cyan-100 min-h-screen px-4 py-8 flex items-center justify-center">
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <h1 className="text-3xl font-bold text-zinc-800 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Login</h1>
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
           
            <button 
              onClick={submit}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg
                hover:from-blue-600 hover:to-purple-600 transform transition duration-300 hover:scale-105 font-medium"
            >
              Login
            </button>

            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="h-[1px] w-full bg-zinc-300"></div>
              <span className="text-zinc-500 px-4 font-medium">OR</span>
              <div className="h-[1px] w-full bg-zinc-300"></div>
            </div>

            <p className="text-center text-zinc-600 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                Sign Up
              </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login
