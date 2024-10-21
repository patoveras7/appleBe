"use client";
import styles from '../../styles/register.module.css'
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
    <div>

        <div className={styles.container}>

          <div className={styles.Be}>
          <h1 className={styles.titleBe}><strong>Be Apple in your life!!</strong></h1>
          <img src="https://i.pinimg.com/236x/fa/5e/67/fa5e67376018e06bd8ffb06b3129a717.jpg" alt="logo" className={styles.logo} />
          </div>

          <div className={styles.formContainer}>


            <form onSubmit={handleSubmit}>
        
              <div>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className={styles.input} />
              {userData.name && errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
              </div>

                <div>
                <label htmlFor="address" className={styles.label}>Address</label>
                <input type="text" id="address" name="address" value={userData.address} onChange={handleChange} className={styles.input} />
                {userData.address && errors.address && <p style={{color: 'red'}}>{errors.address}</p>}
                </div>
                
                <div>
                <label htmlFor="phone" className={styles.label}>Phone</label>
                <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChange} className={styles.input} />
                {userData.phone && errors.phone && <p style={{color: 'red'}}>{errors.phone}</p>}
                </div>
                <div>

                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className={styles.input} />
                {userData.email && errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                </div>
                
                <div>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className={styles.input} />
                {userData.password && errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                </div> 
              
                <div>
                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} className={styles.input} />
                {userData.confirmPassword && errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword}</p>}
                </div> 
      
      

                <button className={styles.button}  type="submit" disabled={!validateRegisterForm(userData, errors)}> Submit </button> 


               </form>

            </div>

         </div>
    
          <div className={styles.background}></div>


</div>


  )
}

export default RegisterView