'use client'
import { IProduct, IUserSession } from "@/interfaces/Types"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'


export const CardProduct: React.FC<IProduct> = ({name, price, image, stock, id}) => { 

  const router = useRouter();
  
  const [userData, setUserData] = useState<IUserSession | null>(null);
  

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(data);
      
    }
  }, []);

    const handleClick = () => {
      
      if (!userData?.token) {
        Swal.fire({
          title: "You have to be logged to add",
          width: 400,
          padding: "3em",
        });

        router.push("/login"); 
        
      } else if (stock < 1) {
        alert("No stock available")
        
      } else {


        const cart = JSON.parse(localStorage.getItem("cart") || "[]") 
        
        
        const productExist = cart.some((localProduct: IProduct) => { 
          if (localProduct.id === id) return true
          return false
        })

        if(productExist){
          Swal.fire({
            title: "This product is already in your cart",
            width: 400,
            padding: "3em",
          });
          router.push("/cart");
        } else {
          cart.push({
            name, price, image, stock, id
          })
          
          localStorage.setItem("cart", JSON.stringify(cart))
          alert("Product Added to cart")
        }
      }
    };

return (
    
              <div className="flex felx-col justify-center items-center relative h-[310px] w-[240px] rounded-[1.5em] border-2 border-white my-4 overflow-hidden transition-transform duration-1000 hover:scale-[1.3] hover:z-10 group">
                    <div className="flex flex-col absolute bottom-[-110%] h-[310px] w-[240px] items center p-[1.5em] pb-[2em] bg-[#000a] transition-all duration-2000 text-white z-10 gap-[0.5em] group-hover:bottom-[-10%]">
                        <h1>{name} ⭐⭐⭐⭐⭐</h1>
                        <h2>How Much? ${price}</h2>
                        <p>Hurry!! {stock} in stock</p>
                        <div className="flex flex-col items-center gap-[1em] mt-[1.3em]">
                        <Link href={`/product/${id}`}><button className="bg-[rgb(3,7,73)] border-3 border-white rounded-[0.5em] px-2 py-0 hover:shadow-[0_0_1em_white]">See product details</button></Link>  
                        <button onClick={handleClick} className="bg-green-500 border-3 border-white rounded-[0.5em] px-2 py-0 hover:shadow-[0_0_1em_white]">Add to Be cart 🛒</button>
                        </div>                    
                    </div>
                    <img src={image} alt={name} className="realtive w-full h-full object-cover"/>
              </div>   
  
  )
}

export default CardProduct;

