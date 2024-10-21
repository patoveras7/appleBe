"use client"
import { login } from "@/helpers/auth.helpers"
import styles from "../../styles/login.module.css"
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
  <div>
      <div className={styles.container}>

            <div className={styles.formContainer}>

                <form onSubmit={handleSubmit}>
    
                      <div>
                      <label htmlFor="email" className={styles.label}><strong>Email:</strong></label>
                      <input
                      id="email"
                      name="email"
                      type="email"
                      value={dataUser.email} 
                      onChange={handleChange}
                      autoComplete="off"
                      className={styles.input}
                      />
                      {dataUser.email && errors.email && <p style={{color:"red"}}>{errors.email}</p>} 
                      </div>  

                      <div>
                      <label htmlFor="password" className={styles.label}><strong>Password:</strong></label>
                      <input
                      id="password"
                      name="password"
                      type="password"
                      value={dataUser.password} 
                      onChange={handleChange}
                      placeholder="********"
                      autoComplete="off"
                      className={styles.input}
                      /> 
                      {dataUser.password && errors.password && <p style={{color:"red"}}>{errors.password}</p>}
                      </div>   
                      <button disabled={!validateLoginForm(dataUser)} type="submit" className={styles.button}>Submit</button>
              </form>

        </div>

        <div className={styles.coment}>
          <div className={styles.question}><p><strong>What we gonna do?</strong></p></div>
          <div className={styles.answer}><p><strong>Sink a tooth into the world 🦷🌎...</strong></p></div>
        </div>

    </div>

    <div className={styles.background}></div>

    </div>
  )
}
export default LoginView