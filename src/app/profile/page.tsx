"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import i from "@/app/favicon.ico"
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'


function Profile() {
  const [userName,setUserName] = useState("Notfound")
  const [userId,setUserId] = useState("notfound");
  const [userEmail,setUserEmail] = useState("notfound");

  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get('api/users/logout')
      toast.success("Logged out")
      router.push('/signin')
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const userDetails = async ()=>{
    try {
      const data:any = await axios.get('/api/users/user')
      console.log(data.data.user)
      setUserId(data.data.user._id)
      setUserName(data.data.user.username)
      setUserEmail(data.data.user.email)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    userDetails();
  },[])

  return (
    <div className=''>
      <div className='flex '>
        <div className='w-1/4 p-2  h-screen '>
          <section className='px-6 py-4 rounded-lg h-full w-full flex flex-col bg-slate-900 '>
            <div className=''>
              <div className='flex flex-col items-center'><Image 
                priority={false}
                src={i} 
                alt='iund' 
                className='border-white border-2 rounded-full' width={150}/></div>
              <p className='text-xl text-center mt-3' key={userId}>{userName}</p>
            </div><br />
            <hr /><br />
            <div className='flex flex-col gap-4'>
              <Link href="/" className='hover:scale-105 text-lg text-center  rounded-lg '>Home</Link>
              <Link href="/dashboard" className='hover:scale-105 text-lg text-center  rounded-lg '>Dashboard</Link>
              <Link href="/" className='hover:scale-105 text-lg text-center  rounded-lg '>Home</Link>
            </div>
            <div className='w-full mt-10'>
              <button 
                onClick={logout}
                className='w-full py-2  border-2 rounded-lg hover:text-black hover:bg-white duration-300 font-semibold'>Logout</button>
            </div>
          </section>
        </div>
        {/* <hr className='h-screen border-2 '/> */}
        <div className='w-3/4 ps-0 p-2  '>
          <div className='bg-slate-900 rounded-lg h-full w-full p-6' key={userId}>
            <h1 className='text-4xl mb-2'>{userName} Details</h1><hr />
            <div className='flex flex-col  px-4 py-8 rounded-lg gap-8 mt-6'>
              <div className=''>
                <label htmlFor="Username" className=''>Username :</label>
                <div className='w-full px-4 py-2 mt-2 rounded-lg border-2 border-slate-700'>{userName}</div>
              </div>
              <div className=''>
                <label htmlFor="email" className=''>Email :</label>
                <div className='w-full px-4 py-2 mt-2 rounded-lg border-2 border-slate-700'>{userEmail}</div>
              </div>
              
              <div className='mt-6'>
                <Link href={`/profile/${userId}`} className='px-10 py-2 border-2 rounded-lg  hover:text-black hover:bg-white duration-300 font-semibold  '>Edit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile