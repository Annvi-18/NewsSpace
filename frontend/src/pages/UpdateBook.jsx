import React from 'react'
import { useState } from 'react'
// import { useEffect } from 'react';
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateBook = () => {
    const [Data,setData] = useState({
            url:"",
            title:"",
            author:"",
            price:"",
            desc:"",
            language:""
        })

        const navigate = useNavigate();
        const {id} = useParams();
    
        const headers = {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            bookid: id
        }
    
        const change = (e)=>{
            const {name,value} = e.target;
            setData({...Data, [name]: value});
        }
    
        const submit = async(e)=>{
            try{
                if(
                    Data.url === "" || Data.title === "" || Data.author === "" || Data.price === "" || Data.desc === "" || Data.language === ""
                ){
                    alert("Please fill all the fields")
                    return;
                }
                const response = await axios.put("http://localhost:1000/api/v1/updatebook", Data, {headers});
                console.log(response.data);
                setData({
                    url:"",
                    title:"",
                    author:"",
                    price:"",
                    desc:"",
                    language:""
                });
                alert("response.data.message")
                navigate("/all-books")
            }
            catch(err){
                console.log(err);
            }

        }
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
    
    
  return (
    <div>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'> Update Book </h1>
        <div className='flex flex-col gap-4'>
            <label htmlFor="">Book URL</label>
            <input type="text" name='url' value={Data.url} onChange={change} className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'/>
            <label htmlFor="">Book Title</label>
            <input type="text" name='title' value={Data.title} onChange={change} className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'/>
            <label htmlFor="">Book Author</label>
            <input type="text" name='author' value={Data.author} onChange={change} className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'/>
            <label htmlFor="">Book Price</label>
            <input type="text" name='price' value={Data.price} onChange={change} className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'/>
            <label htmlFor="">Book Description</label>
            <input type="text" name='desc' value={Data.desc} onChange={change} className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'/>
            <label htmlFor="">Book Language</label>
            <input type="text" name='language' value={Data.language} onChange={change} className='p-2 rounded bg-gradient-to-br from-rose-200 via-violet-200 to-cyan-200 mt-2 font-semibold'/>
        </div>
        <button className='bg-blue-500 text-white p-[10px] rounded-md mt-[20px]' onClick={submit}>Add Book</button>
    </div>
  )
}

export default UpdateBook
