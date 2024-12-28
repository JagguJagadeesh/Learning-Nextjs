import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getUserDetails(req : NextRequest){
    try {
        const token = req.cookies.get('token')?.value || '';
        const tokenDetails: any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return tokenDetails.id
    } catch (error:any) {
        throw new Error(error.message)
    }
}