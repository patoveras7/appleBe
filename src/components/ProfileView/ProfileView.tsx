'use client'
import { IUserSession } from "@/interfaces/Types";
import { useEffect, useState } from "react"
import Link from 'next/link';
import { ordersRoute } from "@/helpers/routes";


const ProfileView = () => {

  const [userData, setUserData] = useState<IUserSession | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(data);
      
    }
  }, []);

  



  return (
    <div className='bg-[url("/images/dashVale.jpg")] bg-cover bg-center w-full h-screen flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center gap-[50px] lg:gap-[75px] xl:gap-[100px] mt-[30px] mb-[30px]">
                      <div className="p-[4px] w-fit text-center bg-blue-300 rounded-[8px] lg:text-[20px]">
                        <strong><p>Wellcome to your Dashboard {userData?.user.name}!!</p></strong>
                      </div>
                <div className="flex flex-col justify-center gap-[85px] lg:gap-[200px] lg:flex-row xl:gap-[450px]">
                    <div className="flex flex-col items-center justify-center bg-blue-300 gap-[6px] w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] border-solid border-[4px] border-blue-950">
                      <p className="text-[14px] sm:text-[16px] lg:text-[20px]"><strong>Name:</strong> {userData?.user.name}</p>
                      <p className="text-[14px] sm:text-[16px] lg:text-[20px]"><strong>Email:</strong> {userData?.user.email}</p>
                      <p className="text-[14px] sm:text-[16px] lg:text-[20px]"><strong>Cellphone</strong> {userData?.user.phone}</p>
                      <p className="text-[14px] sm:text-[16px] lg:text-[20px]"><strong>Address:</strong> {userData?.user.address}</p>
                    </div>

                    <div className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] border-solid border-[4px] border-blue-950">
                      <img src="https://i.pinimg.com/236x/3f/5a/d8/3f5ad816179850d23695910e906554a7.jpg" alt="img" className="relaive w-full h-full object-cover"/>
                    </div>
                </div>


                <div className="flex gap-[20px] sm:gap-[40px] lg:gap-[300px] xl:gap-[550px] text-[14px] sm:text-[16px] lg:text-[20px]">
                    <div className="w-fit p-[2px] lg:p-[4px] border-solid border-[4px] border-blue-950 bg-blue-300 hover:shadow-md hover:shadow-white">
                      <strong><button>Edit Profile Data</button></strong>
                    </div>
                
                    <div className="w-fit p-[2px] lg:p-[4px] border-solid border-[4px] border-blue-950 bg-blue-300 hover:shadow-md hover:shadow-white">
                    <strong><button>Load/Upload Picture</button></strong>
                    </div>
                </div>
                
                <div className="flex text-[14px] sm:text-[16px] lg:text-[20px] justify-center items-center w-fit p-[2px] border-solid border-[2px] border-blue-950 bg-blue-300">
                <p>Would you like to see your orders?? <Link href={ordersRoute}><strong><u>Click here!</u>👋</strong></Link></p>
                </div>
  </div>
      
  
    </div>
  )
}

export default ProfileView