import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const page = () => {
    
  return (
    <div className='p-0 m-0 max-w-screen flex flex-col max-h-screen sm:flex-row justify-center  object-contain items-center '>
      {/* here comes the left side of the registration  */}
      <div className='bg-blue-500 w-full hidden md:inline  '>
        left side
      </div>

      {/* rigth side where registration form will be there */}

      <div className='w-full bg-slate-800  min-h-[95vh]'>
           <RegisterForm userType={"Judge"}/>
      </div>
    </div>
  )
}

export default page