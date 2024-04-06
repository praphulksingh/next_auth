import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!);

        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected successfully");
        });

        connection.on('error', (error)=>{
            console.log('MongoDB connection error. Please make sure MongoDb is running' + error);
            process.exit();
        });
    } catch (error) {
        console.log("something went wrong  while connecting to the database",error);
    }
}