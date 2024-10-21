import { ILoginProps, IRegisterProps } from "@/interfaces/Types";
import Swal from "sweetalert2";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${APIURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const res = await response.json();

        if (response.status === 400) {
            Swal.fire({
                title: "User does not exist.",
                width: 400,
                padding: "3em"
            });
            return null;
        } else {
            return res;
        }
    } catch (error: any) {
        console.error(error);
        return null;
    }
}




export async function register(userData: IRegisterProps) {
     try {
        const response = await fetch(`${APIURL}/users/register`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
        })

        if(response.ok){
            return response.json()
        } else {
            throw new Error ("Something went wrong")   
        }

     } catch (error: any){
     throw new Error (error)       
     }}
               
            