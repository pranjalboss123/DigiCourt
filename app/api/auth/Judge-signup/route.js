import { connectDb } from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";
import Judge from "@/model/judge";
import bcrypt from 'bcryptjs'

const JUDGE_SECRET_KEY = process.env.JUDGE_SECRET_KEY;
export async function POST(request) {
 try {
    const {username,email, password,secretCode} = await request.json();
    console.log(secretCode);
    console.log(JUDGE_SECRET_KEY)

    if (secretCode!==JUDGE_SECRET_KEY) {
        // throw new Error("invalid registration")
        return NextResponse.json({
            error:"secretcode error"
        },{
            status:400
        })
    }
    if (!username||!email||!password) {
        return NextResponse.json({
            error:"email missing for judge"
        },{
            status:400
        })
    }
   await connectDb();
  const existingjudge = await Judge.findOne({email});
  if (existingjudge) {
    NextResponse.json({
        error:"judge already exists "
    },{
        status:400
    }
    )
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const judge = await Judge.create({
    username,
    email,
    password:hashedPassword,
    secretCode,
    approvedCase:[],

  })

  return NextResponse.json({
    message:"judge registered successfully"
  },{
 status:201,
  })
 } catch (error) {
    console.log(error);
    return NextResponse.json({error:"failed to register judge"},{
        status:500,
    })
 }
}