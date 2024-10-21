'use client'
import styles from '../../styles/card.module.css'
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
    
              <div className={styles.cardProduct}>
                    <div className={styles.details}>
                        <h1>{name} ⭐⭐⭐⭐⭐</h1>
                        <h2>How Much? ${price}</h2>
                        <p>Hurry!! {stock} in stock</p>
                        <div className={styles.buttonsContainer}>
                        <Link href={`/product/${id}`}><button className={styles.button1}>See product details</button></Link>  
                        <button onClick={handleClick} className={styles.button3}>Add to Be cart 🛒</button>
                        </div>                    
                    </div>
                    <img src={image} alt={name} className={styles.poster}/>

                    
                    
              </div>   
  
  )
}

export default CardProduct;

