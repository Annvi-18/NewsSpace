import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const AddBooks = () => {
    const [Data,setData] = useState({
        url:"",
        title:"",
        author:"",
        price:"",
        desc:"",
        language:""
    })

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`

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
            const response = await axios.post("http://localhost:1000/api/v1/addbook", Data, {headers});
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
            
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'> Add Books </h1>
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

export default AddBooks
