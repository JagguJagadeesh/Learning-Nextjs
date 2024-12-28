import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        // console.log(reqBody)

        const user = await User.findOne({email});
        if(user) return NextResponse.json({message:"User Already Exists"},{status:400});
        // console.log(user)
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        console.log(salt+","+hashPass)
        const newUser = new User({
            username,
            email,
            password:hashPass
        })
        const savedUser = await newUser.save();
        // console.log(savedUser)

        return NextResponse.json({message:"Successfully Registered...",success:true,user:savedUser});

    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}