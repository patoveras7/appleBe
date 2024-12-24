"use client"
import { login } from "@/helpers/auth.helpers"
import { validateLoginErrors, validateLoginForm } from "@/helpers/validate"
import { ILoginErrors, ILoginProps } from "@/interfaces/Types"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

const LoginView = () => {
  const router = useRouter()

  const initialState = {
    email: "",
    password: ""
  }

  const [dataUser, setDataUser] = useState<ILoginProps>(initialState) 
  const [errors, setErrors] = useState<ILoginErrors>(initialState) 
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    
    const { name, value } = event.target

    setDataUser ({
      ...dataUser,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const response = await login(dataUser);
    
    if (response) {
        const { token, user } = response;
        localStorage.setItem("userSession", JSON.stringify({ token, user }));
        Swal.fire({
            title: "You have successfully logged in",
            width: 400,
            padding: "3em"
        });
        router.push("/");
    } else {
        router.push("/register");
    }
};

  useEffect (()=>{

    const errors = validateLoginErrors(dataUser)
    setErrors(errors)

  }, [dataUser])
  
  
  return (
  
      <div className='bg-[url("/images/LoginFondoVale.jpg")] bg-cover bg-center w-full h-screen flex items-center justify-center lg:justify-end'>

            <div className="text-white flex flex-col gap-[40px] bg-[rgb(3,7,73)] lg:mr-[35px] xl:mr-[105px] 2xl:mr-[230px] h-[500px] sm:h-[600px] w-[300px] sm:w-[350px] p-[25px] pt-[50px] rounded-[12px] shadow-lg transition-shadow hover:shadow-[0_0_1em_white] opacity-[0.8]">

                <h1 className="text-white text-4xl font-bold flex justify-start w-full sm:ml-[22px]">Sign In</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] items-center">
    
                      <div>
                      <input
                      id="email"
                      name="email"
                      type="email"
                      value={dataUser.email} 
                      onChange={handleChange}
                      autoComplete="off"
                      className="w-[250px] h-[50px] rounded-[4px] text-black font-bold"
                      placeholder=" example@mail.com"
                      />
                      {dataUser.email && errors.email && <p style={{color:"red"}}>{errors.email}</p>} 
                      </div>  

                     <div>
                      <input
                      id="password"
                      name="password"
                      type="password"
                      value={dataUser.password} 
                      onChange={handleChange}
                      placeholder=" Password"
                      autoComplete="off"
                      className="w-[250px] h-[50px] rounded-[4px] text-black font-bold"
                      /> 
                      {dataUser.password && errors.password && <p style={{color:"red"}}>{errors.password}</p>}
                      </div>   
                      <button disabled={!validateLoginForm(dataUser)} type="submit" className="w-[250px] h-[37px] rounded-[4px] text-white font-bold bg-rose-700">Sign In</button>
                      <h3>Forgot password?</h3>
              
              </form>

              <p className="text-[12px]">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>

        </div>

    </div>


  )
}
export default LoginView