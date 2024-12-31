import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/helpers/mailer';



connect();

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {userEmail,userId}:any = reqBody;
        console.log(userEmail)
        if(!userEmail || !userId) return NextResponse.json({Message:"Undefine"},{status:400})
        const mailinfo = await sendMail({email:userEmail,emailType:"ResetPassword",userId:userId});
        return NextResponse.json({
            Message:"Mail Sent",
            success:true,
            mailinfo
        })
    } catch (error:any) {
        console.log(error)
        throw new Error(error.message);
    }
}