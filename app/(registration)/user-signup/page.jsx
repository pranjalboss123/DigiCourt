import RegisterForm from '@/components/RegisterForm'
import React from 'react'

const page = () => {
  return (
    <div className='p-0 m-0 min-w-screen flex flex-col sm:flex-row justify-center items-center '>
      {/* here comes the left side of the registration  */}
      <div className='bg-blue-500 w-full hidden md:inline  '>
        left side
      </div>

      {/* rigth side where registration form will be there */}

      <div className='w-full bg-gray-400 h-screen'>
           <RegisterForm userType={"User"}/>
      </div>
    </div>
  )
}

export default page
