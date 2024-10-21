'use client'
import styles from "../../../styles/dashboard.module.css"
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
    <div>
      <div className={styles.container}>
          <div className={styles.header}>
            <strong><p>Wellcome to your Dashboard {userData?.user.name}!!</p></strong>
          </div>
    <div className={styles.boxes}>
        <div className={styles.boxLeft}>
          <p className="text-[1.5em]"><strong>Name:</strong> {userData?.user.name}</p>
          <p className="text-[1.5em]"><strong>Email:</strong> {userData?.user.email}</p>
          <p className="text-[1.5em]"><strong>Cellphone</strong> {userData?.user.phone}</p>
          <p className="text-[1.5em]"><strong>Address:</strong> {userData?.user.address}</p>
        </div>

        <div className={styles.boxRight}>
          <img src="https://i.pinimg.com/236x/3f/5a/d8/3f5ad816179850d23695910e906554a7.jpg" alt="img" className={styles.poster}/>
        </div>
    </div>


    <div className={styles.buttons}>
        <div className={styles.button1}>
          <strong><button>Edit Profile Data</button></strong>
        </div>
    
        <div className={styles.button2}>
        <strong><button>Load/Upload Picture</button></strong>
        </div>
    </div>
    
    <div className={styles.linkOrders}>
    <p>Would you like to see your orders?? <Link href={ordersRoute}><strong><u>Click here!</u>👋</strong></Link></p>
    </div>
  </div>
      
  <div className={styles.background}></div>
    </div>
  )
}

export default ProfileView