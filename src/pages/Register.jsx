import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../apis/auth';
import {toast } from 'react-toastify';

const initialFormState = {
  firstname:'',
  lastname:'',
  email:'',
  password:''
}

function Register() {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const pageRoute = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevFormData) => ({...prevFormData, [e.target.name] : e.target.value}))  ;
  }

  const handleOnSubmit = async (e) => {
      e.preventDefault();

      setIsLoading(true);

      if(formData.email.includes('@') && formData.password.length > 6){
        //make a req to register api

        const {data} = await registerUser(formData);

        // console.log('data',{data})

        if(data?.token){
            localStorage.setItem("userToken", data.token);
            toast.success("Successfully Registered");
            setIsLoading(false);
            pageRoute("/chats");
        }else{
          setIsLoading(false);
          toast.error("Invalid Credentials!");
        }
      }


  }


  return (
    <div className='bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className='w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:ml-9 mt-10 relative'>
            <div className='absolute -top-10 left-0'>
              <h3 className='text-[25px] font-bold tracking-wider text-[#fff]'>Register</h3>
              <p className='text-[#fff] text-[12px] tracking-wider font-medium '>Have Account ? <Link to='/login' className=' cursor-pointer  text-teal-300	underline' >Sign in</Link></p>

            </div>

            <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-3 mt-[12%]'>
              <div className='flex gap-x-2  w-[100%]'>
                <input onChange={handleOnChange} value={formData.firstname} className='h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]'  type='text' name='firstname' placeholder='First Name' required />
                <input onChange={handleOnChange} value={formData.lastname} className='h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]' type='text' name='lastname' placeholder='Last Name' required />
              </div>

              <div>
                <input onChange={handleOnChange} value={formData.email} className='h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96%] ' type='email' name='email' placeholder='Email' required/>
              </div>


              <div className='relative lex flex-col gap-y-3'>
                <input onChange={handleOnChange} value={formData.password} className='h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96%] ' type='password' name='password' placeholder='Password' required/>
              </div>

              <button style={{
                background: "linear-gradient(90deg, rgba(0,195,154,1) 0% , rgba(224,205,115,1) 100%)"
              }}  className='cursor-pointer  w-[100%] sm:w-[96%] h-[50px] font-bold tracking-wide relative text-[16px] ' type='submit' >
                Register
              </button>

            </form>
      </div>
    </div>
  )
}

export default Register