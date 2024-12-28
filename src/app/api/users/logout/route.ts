import { NextResponse } from "next/server";


export async function GET() {
    try {
        const res = NextResponse.json({
            message:"Logout Successfull",
            success:true
        })
        res.cookies.set('token',"",{
            httpOnly:true,
            expires: new Date(0)
        });
        return res;
    } catch (error:any) {
        console.log(error.message)
    }
}