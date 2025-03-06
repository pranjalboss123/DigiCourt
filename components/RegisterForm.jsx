"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const RegisterForm = ({userType}) => {
 const router = useRouter()
   const [username, setusername] = useState("");
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");
   const [confirmpassword, setconfirmpassword] = useState("");
   const [secretCode,setSecretCode] = useState('');
   const [error,setError] = useState('');
   
   const handleSubmit = async(e)=>{
      setError("")
    e.preventDefault();
        try {
            console.log(secretCode);
            if(password !== confirmpassword){
                
                setError(" password does not match ")
                // throw new Error("password do not match");
                return;
            }

         const res = await fetch(`/api/auth/${userType}-signup`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({username,email,password,secretCode})
         });
         if(!res.ok) {
            throw new Error("response failed")
         }
         const data = await res.json();
         router.push("/");
        } catch (error) {
            console.log("error fetching while registration",error)
        }
   }

  return (
    <section className='w-full flex flex-col items-center justify-center  gap-5'>
        <h1 className='text-4xl text-slate-400 font-bold mt-5'>Register as a {userType}</h1>
      <form onSubmit={handleSubmit} className="flex bg-slate-600 flex-col justify-center rounded-2xl p-3 items-center gap-3 h-full">
        <label className='text-white font-semibold text-3xl' htmlFor="">username</label>
          <Input value={username} onChange={(e)=>setusername(e.target.value)} className="p-1 m-1 w-100"  type={"text"} placeholder="enter you name"/>
          <label className='text-white font-semibold text-3xl' htmlFor="">email</label>
          <Input value={email} onChange={(e)=>setemail(e.target.value)} className="p-1 m-1 w-100"  type={"email"} placeholder="enter you email"/>



          <label className='text-white font-semibold text-3xl' htmlFor="">password</label>
          <Input value={password}  onChange={(e)=>setpassword(e.target.value)} className="p-3 m-1 w-100 " type={"password"} placeholder="enter you password"/>

          <label className='text-white font-semibold text-3xl' htmlFor="">confirm password</label>
          <Input value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} className="p-3 m-1 w-100 " type={"password"} placeholder="confirm password"/>
            {error&&(<p>{error}</p>)}
{ userType==="Judge" && <>
          <label className='text-white font-semibold text-3xl '  htmlFor="">secretCode</label>
          <Input value={secretCode} onChange={(e)=>setSecretCode(e.target.value)} type={"text"} className="p-3 m-1 w-fit" placeholder="enter secretCode"/>
</>
}

<button type="submit" >Register now </button>
      </form>
    </section>
  )
}

export default RegisterForm
