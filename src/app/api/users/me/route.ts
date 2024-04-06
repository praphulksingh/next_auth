import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dnconfig";
connect();
export async function GET(request: NextRequest) {

    try {
        const UserId=await getDataFromToken(request);
        const user=await  User.findOne({_id:UserId}).select("-password");
        console.log(user)
        return NextResponse.json({
            status:"success",
            message:"user found",
            data:user});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}
