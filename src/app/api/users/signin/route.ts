import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;

        const user = await User.findOne({email});
        if(!user) return NextResponse.json({message:"User Not Found"},{status:400});

        const verifiedPass = await bcrypt.compare(password,user.password);
        if(!verifiedPass) return NextResponse.json({message:"Password Ivalid"},{status:400});

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const res = NextResponse.json({
            message:"Login Successfully",
            success:true,
        });
        res.cookies.set("token",token,{httpOnly:true});
        return res;

    } catch (error: any) {
        NextResponse.json({error:error.message},{status:500})
    }

}