"use client"
import Link from 'next/link';
import { homeRoute, loginRoute, registerRoute, cartRoute, categoiresRoute, dashboardRoute } from '@/helpers/routes'; 
import { useEffect, useState } from 'react';
import { IUserSession } from '@/interfaces/Types';
import { usePathname } from 'next/navigation';
import { useMenu } from '@/hooks/useMenu/useMenu';

const Navbar = () => {

  const {isOpen, toggleMenu, closeMenu, menuRef, buttonRef } = useMenu();  // Hay que llamar a la funcion al momento de desestructurar.    

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Si el menú está abierto y el clic ocurre fuera de él, lo cerramos
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current !== event.target) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);


  
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

    <div className='flex flex-col bg-[rgb(2,5,48)]'>
    
                <div className="flex items-center justify-between relative p-[8px] sm:p-[12px] md:p-[16px] mt-[10px]">
                  {/* Logo */}
                  <div className="flex items-center gap-[2px] sm:gap-[6px] md:gap-[10px] sm:ml-[15px] lg:gap-[14px]">
                    <Link href={homeRoute}><div><h1 className="text-[16px] sm:text-[22px] md:text-[28px] lg:text-[32px] text-white"><strong>AppleBe</strong></h1></div></Link>
                    <Link href={homeRoute}><div><img src="https://i.pinimg.com/236x/fa/5e/67/fa5e67376018e06bd8ffb06b3129a717.jpg" alt="logoWhite" className="w-[17px] h-[17px] rounded-[2px] sm:w-[23px] sm:h-[23px] sm:rounded-[5px] md:w-[26px] md:h-[26px] md:rounded-[7px] lg:w-[40px] lg:h-[40px] lg:rounded-[8px] m-auto" /></div></Link>
                  </div>

                  {/* Navegation buttons */}
                  <div className="flex justify-end gap-[4px] sm:gap-[10px] md:gap-[12px] sm:mr-[15px] items-center">
                    
                    {userData?.token ? (
                      <>
                    
                              
                            <button ref={buttonRef} onClick={toggleMenu} 
                            className={`w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] relative flex justify-center items-center text-2xl transition-transform duration-500 z-10
                              ${isOpen ? "rotate-45 scale-75" : "rotate-0 scale-100"} hover:border-white hover:border-solid hover:border-[2px]`}> 
                              🍎
                          </button>
                            <Link href={cartRoute}><button className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-400 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white underline sm:no-underline"><strong>Check Be 🛒</strong></button></Link>  
                            <Link href={homeRoute}><button onClick={handleLogout} className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-400 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white underline sm:no-underline"><strong>Log out</strong></button></Link>
                            <Link href={dashboardRoute}><div><img src="https://i.pinimg.com/236x/3f/5a/d8/3f5ad816179850d23695910e906554a7.jpg" alt="logoWhite" className="w-[17px] h-[17px] rounded-[2px] sm:w-[23px] sm:h-[23px] sm:rounded-[5px] md:w-[26px] md:h-[26px] md:rounded-[7px] lg:w-[40px] lg:h-[40px] lg:rounded-[8px] m-auto"/></div></Link>
                      </>
                    ) : (
                      <>
                            <button ref={buttonRef} onClick={toggleMenu} 
                            className={`w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] relative flex justify-center items-center text-2xl transition-transform duration-500 z-10
                              ${isOpen ? "rotate-45 scale-75" : "rotate-0 scale-100"} hover:border-white hover:border-solid hover:border-[2px]`}> 
                              🍎
                          </button>
                            <Link href={registerRoute}><button className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-400 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white underline sm:no-underline"><strong>Register</strong></button></Link>
                            <Link href={loginRoute}><button className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-400 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white underline sm:no-underline">Sign In</button></Link>
                      </>
                      
                    )}
                  </div>
                </div>


                <div className='flex justify-center pb-[15px]' ref={menuRef}>
                  {isOpen && (
                        <ul className='flex items-center justify-normal gap-[14px] sm:gap-[35px] md:gap-[60px] lg:gap-[90px] xl:gap-[130px]'>
                      <li>
                          <Link href={homeRoute}><button className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-600 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white hover:underline"><strong>Products</strong></button></Link>
                      </li>
                      <li>
                          <Link href={categoiresRoute}><button className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-600 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white hover:underline"><strong>Categories</strong></button></Link>
                      </li>
                      <li>
                          <button className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-600 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white hover:underline"><strong>Contacto</strong></button>
                      </li>
                      <li>
                          <button className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] p-0.5 px-1 sm:p-1 sm:px-2 text-gray-600 cursor-pointer transition-all duration-1300 ease-in-out hover:text-white hover:underline"><strong>Ofertas</strong></button>
                      </li>
                        </ul>
                      )}
                </div>

     </div>



  );
};

export default Navbar;
