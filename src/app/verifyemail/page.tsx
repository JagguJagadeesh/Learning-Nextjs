"use client";
import axios from "axios";
import React,{useEffect, useState} from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function VerifyEmail(){
    const router = useRouter();
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);

    const verifyEmail = async ()=>{
        try {
            // console.log(token)
            const res: any = await axios.post('/api/users/verifyemail',{token});
            // console.log(res)
            setVerified(true)
            toast.success(res.data.message)
            router.push('/signin');
        } catch (error:any) {
            console.log(error.response.data) ;
        }
    }

    useEffect(()=>{
        setToken(window.location.search.split("=")[1] || "");
    },[token])

    return  (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="bg-slate-200 text-black rounded-lg py-10 px-44">
                <h1 className="text-2xl font-sans">Click Button To Verify Your Email...</h1><br />
                <button 
                    className="px-6 py-2  border-2 border-black rounded-md hover:bg-black hover:text-white duration-300"
                    onClick={verifyEmail}>
                    {token.length>0?"Verify":"Processing..."}
                </button>
            </div>
            {/* {verified && <Link href='/signin' className="px-8 py-2 bg-blue-500">Signin</Link>} */}
        </div>
    )
}