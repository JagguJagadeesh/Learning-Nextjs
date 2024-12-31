"use client";
import React,{useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ReSetPassWord(){
    const router = useRouter();
    const [token,setToken] = useState('');
    const [pass,setPass] = useState("");
    const [cpass,setCPass] = useState("");
    const [err,setErr] = useState(false);

    useEffect(()=>{
        if(cpass!==pass) setErr(true);
        else if(cpass===pass) setErr(false);
    },[cpass])
    useEffect(()=>{
        setToken(window.location.search.split("=")[1] || "")
    },[token])

    const verify = async ()=>{
        try {
            await axios.post('/api/users/resetpassword',{token:token,password:pass});
            toast.success("Password Reset SuccessFully...")
            router.push('/profile');
        } catch (error:any) {
            console.log(error)
            toast.error(error)
        }
    }

    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-slate-300 text-black w-[32rem] px-20 py-6  rounded-lg">
                <h1 className="text-2xl font-sans mb-6 text-center font-extrabold">Reset Your Password</h1>
                <div className="">
                    <input 
                        type="password" 
                        className="w-full p-2 mb-4 rounded-md border-2 border-slate-500"
                        placeholder="Enter Your Password"
                        onChange={(e)=>setPass(e.target.value)} />
                    <input 
                        type="password" 
                        className={`w-full p-2 mb-1 rounded-md border-2 border-slate-500 ${err?'text-yellow-400':''}`}
                        placeholder="Confirm Your Password"
                        onChange={(e)=>setCPass(e.target.value)} />
                    {err ? <p className="p-1 pl-4 bg-yellow-100 rounded-lg text-red-500">Please Check Your Password</p>:'' }
                </div>
                <button 
                    className="border-2 border-black py-2 px-8 mt-4 rounded-lg hover:bg-black hover:text-white duration-500"
                    onClick={verify}>
                    {token.length>0 && cpass ? "Reset":"Processing..."}</button>
            </div>
        </div>
    )
}