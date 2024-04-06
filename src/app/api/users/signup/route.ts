import {connect} from "@/dbconfig/dnconfig";
import { User } from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        console.log(username)
        if (username.length<0 && email.length<0 && password.length<0) {
            return NextResponse.json({message:"All fields are required!"})
        }

        const userExists=await User.findOne({$or:[{username},{email}]});

        if(userExists) {
            return NextResponse.json({message:`User with ${userExists.username===username?"Username":"Email"} already exists`},{status:400})
        }

        const salt=await bcryptjs.genSalt(10);
        const hashPassword= await bcryptjs.hash(password,salt);

        const newUser=await new User({
            username,
            email,
            password:hashPassword
        }).save();
        console.log(newUser);

        return NextResponse.json({
            message: `User ${username} has been created!`,
            success:true,
        })
        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}