"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



function Signup() {
  const router = useRouter();
  const [user,setuser] = useState({
      username:"",
      email:"",
      password:""
    });
    const [loading,setLoading] = useState(false);
  
    const onSignUP = async ()=>{
      try {
        setLoading(true);
        const res = await axios.post('/api/users/signup',user);
        if(res) toast.success('Signin Successfully...');
        router.push('/signin');
      } catch (error) {
        // console.log("Signup Failed");
        toast.error('Signup Failed');
      }finally{
        setLoading(false);
      }
    }
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[28rem] bg-white py-6 px-14 text-black rounded-md shadow-sm shadow-white flex flex-col gap-4">
          <h1 className="text-center text-xl">Don't Have Account / <Link href="signin" className="text-blue-600 underline">Signin</Link> </h1>
          <hr className="  mb-4 border-black"/>
          <div>
            <label htmlFor="name">UserName :</label>
            <input 
              type="text" 
              value={user.username}
              onChange={(e)=>setuser({...user,username:e.target.value})} className="w-full border-2 border-gray-400 px-2 py-3 rounded-lg mt-1 text-black" 
              placeholder="Enter Your Username" />
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input 
              type="email" 
              value={user.email}
              onChange={(e)=>setuser({...user,email:e.target.value})} className="w-full border-2 border-gray-400 px-2 py-3 rounded-lg mt-1 text-black" 
              placeholder="Enter Your Email" />
          </div>
          <div>
            <label htmlFor="password">Password :</label>
            <input 
              type="password" 
              value={user.password}
              onChange={(e)=>setuser({...user,password:e.target.value})} className="w-full border-2 border-gray-400 px-2 py-3 rounded-lg mt-1 text-black" 
              placeholder="Enter Your Password" />
          </div>
          <div>
            <button 
              className="w-full text-xl bg-sky-400 duration-200 rounded-lg p-4 mt-4 hover:text-white hover:bg-sky-500"
              onClick={onSignUP}>{loading?"Processing...":"Signup"}</button>
          </div>
        </div>
      </div>
    )
}

export default Signup