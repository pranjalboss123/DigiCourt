import { NextRequest,NextResponse } from "next/server";
import {connectDb} from "@/lib/db"
import bcrypt from 'bcryptjs'
import User from "@/model/User";

export async function POST(request,response) {
    try {
        const {username,email,password} = await request.json()
        if (!username||!email||!password) {
            return NextResponse.json({
                error:"Email or username or password missing",
            },{
                status:400,
            })
        }

        await connectDb();

        const existingUser = await User.findOne({email})
        if (existingUser) {
           return NextResponse.json({
                error:"user already exists"
            })
        }

        const hashedPassword =await bcrypt.hash(password,10);

   
        const user = await User.create({
            username,
            email,
            password:hashedPassword,
        })

        return NextResponse.json({
            message:"user registered successfully"

        },{
            status:201
        })


    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"failed to register"},{
            status:500
        })
    }
}