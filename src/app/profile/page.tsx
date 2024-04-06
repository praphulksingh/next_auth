"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import React, { useState } from "react"
import Link from "next/link"

export default function ProfilePage(){
    const router=useRouter()
    const [data,setData]=useState("nothing")
    const onLogout=async ()=>{
        try {
            await axios.get("/api/users/logout");
            router.push("/login")
        } catch (error:any) {
            console.log(error.message)
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div><h1>this is profile page</h1>
        <h1>Profile</h1>
        <h1>Profile {data==="nothing"?"nothing":<Link href="/profile/${data}">{data}</Link>}</h1>
        
<button type="button" onClick={onLogout} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</button>
        
        <hr />
        <div>
            <button type="button" onClick={getUserDetails} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">GetUserDetails</button>
        </div>
        </div>
        
    )
}