"use client";
import { getProductById } from "@/helpers/product.helpers";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IProduct, IUserSession } from "@/interfaces/Types";

const ProductDetailView = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession | null>(null);
  
  const [product, setProduct] = useState<any>(null); 


  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(data);
    }
  }, []);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleClick = () => {
    if (!userData?.token) {
      Swal.fire({
        title: "You have to be logged to add",
        width: 400,
        padding: "3em",
      });
      router.push("/login");
    } else if (product.stock < 1) {
      Swal.fire({
        title: "No stock available",
        width: 400,
        padding: "3em",
      });
      router.push("/");
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]") 
      const productExist = cart.some((localProduct: IProduct) => { 
        if (localProduct.id === product.id) return true
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
          ...product,

        })
        localStorage.setItem("cart", JSON.stringify(cart))
        Swal.fire({
          title: "Product added to cart",
          width: 400,
          padding: "3em",
        });
      }
    }
  };


  return (
    <div className='bg-[url("/images/productDetail.jpg")] bg-cover bg-center w-full h-screen flex justify-center'>
      <div className="flex flex-col gap-[40px] items-center md:flex-row md:gap-[60px] lg:gap-[100px] xl:gap-[220px]">
        
        
        <div className="w-[240px] h-[350px] rounded-[4px] overflow-hidden mt-[25px] 
        shadow-xl shadow-black md:mb-[25px] lg:w-[300px] lg:h-[410px]">
          <img className="relative w-full h-full object-cover" src={product?.image} alt="Product" />
        </div>
        
        <div className="flex flex-col relative justify-center items-center w-[240px] 
        h-fit rounded-[4px] bg-white overflow-hidden gap-[14px] mb-[25px] 
        shadow-xl shadow-black md:mt-[25px] lg:w-[300px]">
          <h1 className="text-[24px] mt-[12px] font-bold text-center lg:text-[28px] xl:text-[30px]">
            <strong>{product?.name}</strong>
          </h1>
          <h2 className="text-[16px] lg:text-[20px] xl:text-[26px]">⭐⭐⭐⭐⭐</h2>
          <p className="text-justify text-[12px] ml-[10px] mr-[10px] lg:text-[16px] xl:text-[18px]">{product?.description}</p>
          <p className="bg-[#ffd700] text-[14px] self-start p-[3px] lg:text-[18px] xl:text-[20px]">
            <strong>The price is: ${product?.price}</strong>
          </p>
          <p className="bg-[#ffd700] text-[14px] self-end p-[3px] lg:text-[18px] xl:text-[20px]">
            <strong>Cantidad en stock: {product?.stock}</strong>
          </p>
          <div className="text-[14px] mb-[12px] lg:text-[18px] xl:text-[20px]">
            <button onClick={handleClick} className="bg-green-500 mb-[8px] p-[3px] hover:shadow-md hover:shadow-black">
              <strong>Add to Be cart 🛒</strong>
            </button>
          </div>
        </div>
      
      
      
      
      </div>
    </div>
  );
};

export default ProductDetailView;
