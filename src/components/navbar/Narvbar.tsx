"use client"
import styles from '../../styles/navbar.module.css';
import Link from 'next/link';
import { homeRoute, loginRoute, registerRoute, cartRoute, categoiresRoute, dashboardRoute } from '@/helpers/routes'; 
import { useEffect, useState } from 'react';
import { IUserSession } from '@/interfaces/Types';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  
  const pathname = usePathname(); 
  const [userData, setUserData] = useState<IUserSession | null> (null);

 
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(data);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("cart"); 
    setUserData(null);

  };



  return (
    <div className={styles.navbar}>
      {/* Logo */}
      <div className={styles.left}>
        <Link href={homeRoute}><div><h1 className={styles.title}><strong>AppleBe</strong></h1></div></Link>
        <Link href={homeRoute}><div><img src="https://i.pinimg.com/236x/fa/5e/67/fa5e67376018e06bd8ffb06b3129a717.jpg" alt="logoWhite" className={styles.logoNav} /></div></Link>
      </div>

      {/* Navegation buttons */}
      <div className={styles.options}>
        {/* Si el usuario está logueado (tiene token) */}
        {userData?.token ? (
          <>
                <Link href={homeRoute}><button className={styles.buttonOptions}><strong>Products</strong></button></Link>
                <Link href={categoiresRoute}><button className={styles.buttonOptions}><strong>Categories</strong></button></Link>
                <Link href={cartRoute}><button className={styles.buttonOptions}><strong>Check Be 🛒</strong></button></Link>
                <Link href={homeRoute}><button onClick={handleLogout} className={styles.buttonOptions}><strong>Log out</strong></button></Link>
                <Link href={dashboardRoute}><div><img src="https://i.pinimg.com/236x/3f/5a/d8/3f5ad816179850d23695910e906554a7.jpg" alt="logoWhite" className={styles.logoNav}/></div></Link>
          </>
        ) : (
          <>
                <Link href={homeRoute}><button className={styles.buttonOptions}><strong>Products</strong></button></Link>
                <Link href={categoiresRoute}><button className={styles.buttonOptions}><strong>Categories</strong></button></Link>
                <Link href={registerRoute}><button className={styles.buttonOptions}><strong>Register</strong></button></Link>
                <Link href={loginRoute}><button className={styles.buttonOptions}>Sign In</button></Link>
              </>
           
        )}
      </div>
    </div>
  );
};

export default Navbar;
