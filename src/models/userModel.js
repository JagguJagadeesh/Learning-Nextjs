import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide UserName"]
    },
    email:{
        type:String,
        required:[true,"Please Provide Email"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPassToken: String,
    forgotPassTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;