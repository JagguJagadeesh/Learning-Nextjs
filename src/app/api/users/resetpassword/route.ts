import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {token,password}:any = reqBody;
        console.log(token,password)

        const user = await User.findOne({forgotPassToken:token,forgotPassTokenExpiry:{$gt: Date.now()}});
        if(!user) return NextResponse.json({Message:"User Not Found..."},{status:400});

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        user.password = hashPass;
        user.forgotPassToken = undefined;
        user.forgotPassTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({Message:"Password Rest SuccessFully"},{status:200})

    } catch (error:any) {
        console.log(error)
    }
}