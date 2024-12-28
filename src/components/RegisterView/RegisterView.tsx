"use client";
import { useRouter } from 'next/navigation';
import { register } from '@/helpers/auth.helpers';
import { validateRegisterErrors, validateRegisterForm } from '@/helpers/validate';
import { IRegisterErrors, IRegisterProps } from '@/interfaces/Types';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const RegisterView = () => {

  const router = useRouter();

    const initialState = {
      name: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""  
    };

    const [userData, setUserData] = useState<IRegisterProps>(initialState);
    const [errors, setErrors] = useState<IRegisterErrors>({});
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const newUserData = { ...userData, [name]: value };
      setUserData(newUserData);
      const newErrors = validateRegisterErrors(newUserData);
      setErrors(newErrors);
    };

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await register(userData)
      Swal.fire({
        title: "You have successfully registered",
        width: 400,
        padding: "3em"
      })
      router.push("/login")  
    }

    
  
  
  
  
    return (
 

      <div className='bg-[url("/images/blueApple.jpg")] bg-cover bg-center w-full min-h-screen flex flex-col items-center gap-[50px]'>

          <div className="flex items-center justify-center mt-[40px] gap-[5px] p-[6px] rounded-[4px] bg-black">
          <h1 className="text-white text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]"><strong>Be Apple in your life!!</strong></h1>
          <img src="https://i.pinimg.com/236x/fa/5e/67/fa5e67376018e06bd8ffb06b3129a717.jpg" alt="logo" className="w-[32px] h-[32px] md:w-[34px] md:h-[34px] lg:w-[36px] lg:h-[36px]" />
          </div>

          <div className="text-white flex flex-col bg-[rgb(3,7,73)] h-fit w-[300px] sm:w-[350px] p-[25px] rounded-[4px] shadow-lg shadow-white opacity-[0.8] mb-[20px]">


            <form onSubmit={handleSubmit} className="flex flex-col gap-[25px] text-[12px] sm:text-[14px] md:text-[14px]">
        
              <div className="flex flex-col gap-[2px]">
              <label htmlFor="name" className="font-bold">Name</label>
              <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className="text-black h-[30px] text-[12px] sm:text-[14px] md:text-[16px]" placeholder=' Your Name' />
              {userData.name && errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-[2px]">
                <label htmlFor="address" className="font-bold">Address</label>
                <input type="text" id="address" name="address" value={userData.address} onChange={handleChange} className="text-black h-[30px] text-[12px] sm:text-[14px] md:text-[16px]" placeholder=' Your Address' />
                {userData.address && errors.address && <p style={{color: 'red'}}>{errors.address}</p>}
                </div>
                
                <div className="flex flex-col gap-[2px]">
                <label htmlFor="phone" className="font-bold">Phone</label>
                <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChange} className="text-black h-[30px] text-[12px] sm:text-[14px] md:text-[16px]" placeholder=' Your Phone Number' />
                {userData.phone && errors.phone && <p style={{color: 'red'}}>{errors.phone}</p>}
                </div>

                <div className="flex flex-col gap-[2px]">
                <label htmlFor="email" className="font-bold">Email</label>
                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="text-black h-[30px] text-[12px] sm:text-[14px] md:text-[16px]" placeholder=' Your Email Address' />
                {userData.email && errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                </div>
                
                <div className="flex flex-col gap-[2px]">
                <label htmlFor="password" className="font-bold">Password</label>
                <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className="text-black h-[30px] text-[12px] sm:text-[14px] md:text-[16px]" placeholder=' ***********' />
                {userData.password && errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                </div> 
              
                <div className="flex flex-col gap-[2px]">
                <label htmlFor="confirmPassword" className="font-bold">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} className="text-black h-[30px] text-[12px] sm:text-[14px] md:text-[16px]" placeholder=' ***********' />
                {userData.confirmPassword && errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword}</p>}
                </div> 
      
      

                <button className="w-[250px] sm:w-[300px] h-[37px] rounded-[4px] text-white font-bold bg-rose-700"  type="submit" disabled={!validateRegisterForm(userData, errors)}> Submit </button> 


               </form>

            </div>

         </div>
    
          





  )
}

export default RegisterView