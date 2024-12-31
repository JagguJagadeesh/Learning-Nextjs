import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs";



export async function sendMail({email,emailType,userId}: any) {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10);
        if(emailType === "VerifyEmail"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }else if(emailType === "ResetPassword"){
            await User.findByIdAndUpdate(userId,{
                forgotPassToken:hashedToken,
                forgotPassTokenExpiry:Date.now()+3600000
            })
        }
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MailTrap_UserName,
              pass: process.env.MailTrap_Pass
            },
        });
        const emailOptions = {
            from: '"Jagadeesh " <Jaggu@email.com>', // sender address
            to: email, // list of receivers
            subject: `To ${emailType} `, // Subject line
            text: `Hello ${email} `, // plain text body
            html: `<p><a href="${process.env.DOMAIN}/${emailType==='VerifyEmail'?'verifyemail':'resetpassword'}?token=${hashedToken}">Click here</a> to ${emailType === "VerifyEmail" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType==='VerifyEmail'?'verifyemail':'resetpassword'}?token=${hashedToken} </p>`, // html body
        }
        const mailinfo = await transporter.sendMail(emailOptions);
        console.log(mailinfo)
        return mailinfo
    } catch (error:any) {
        console.log({"Error at mail":error.message});
        throw new Error(error)
    }
}