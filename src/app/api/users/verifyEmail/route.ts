import { connect } from "@/dbconfig/dnconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const{token}=reqBody

        const userToken=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:new Date()}})

        if (!userToken) {
            return NextResponse.json({error:"Invalid token"},{status:401})
        }

        userToken.isVerfied=true;
        userToken.verifyToken=undefined;
        userToken.verifyTokenExpiry=undefined;
        await userToken.save();

        return NextResponse.json({message:"Email verified successfully",success:true});
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}