import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB Connected Sucessfully...");
        })
        connection.on('error',(err)=>{
            console.log("MogoDB Connection error ",err);
            process.exit();
        })
    } catch (error) {
        console.log('Error :',error)
    }
}