import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { getUserDetails } from "@/helpers/getUserDetailsFromToken";
import {connect} from '@/dbConfig/dbConfig'

connect();

export async function GET(req:NextRequest) {
    try {
        const userid = await getUserDetails(req)
        const user = await User.findOne({_id:userid}).select('-password');
        return NextResponse.json({
            message:"User Details",
            user:user,
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({Error:error.message},{status:400})
    }
}