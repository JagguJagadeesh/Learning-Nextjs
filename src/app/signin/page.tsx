"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


function Login() {
  const router = useRouter();
  const [user,setuser] = useState({
    email:"",
    password:""
  })
  const [loading,setLoading] = useState(false);


  const onSignIN = async ()=>{
    try {
      setLoading(true);
      const res = await axios.post('/api/users/signin',user);
      console.log(res);
      toast.success("Welcome");
      router.push('/profile');
    } catch (error: any) {
      console.log(error);
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[28rem] bg-white p-14 text-black rounded-md shadow-md shadow-white flex flex-col gap-6">
      <h1 className="text-center text-xl">Please Signin / <Link href="signup" className="text-blue-600 underline">Signup</Link> </h1>
      <hr className="  mb-4 border-black"/>
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
            className="w-full text-xl bg-sky-400 duration-200 rounded-lg p-4 hover:bg-sky-500 hover:text-white"
            onClick={onSignIN}>{loading?"Processing...":"Signin"}</button>
        </div>
      </div>
    </div>
  )
}

export default Login