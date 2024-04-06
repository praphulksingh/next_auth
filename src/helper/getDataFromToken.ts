import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const getDataFromToken=(request: NextRequest)=> {
    try {
        const token=request.cookies.get("token")?.value || "";
        const decodedData:any=jwt.verify(token,process.env.TOKKEN_SECRTE!);
        return decodedData.id;
    } catch (error:any) {
        throw new Error(error.message)
    }
}