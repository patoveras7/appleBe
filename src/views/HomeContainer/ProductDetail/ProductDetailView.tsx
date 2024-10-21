"use client";
import { getProductById } from "@/helpers/product.helpers";
import styles from "../../../styles/productDetail.module.css";
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
    <div className={styles.fatherContainer}>
      <div className={styles.sonContainer}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={product?.image} alt="Product" />
        </div>
        <div className={styles.detailContainer}>
          <h1 className={styles.name}>
            <strong>{product?.name}</strong>
          </h1>
          <h2 className={styles.stars}>⭐⭐⭐⭐⭐</h2>
          <p className={styles.description}>{product?.description}</p>
          <p className={styles.price}>
            <strong>${product?.price}</strong>
          </p>
          <p className={styles.stock}>
            <strong>Cantidad en stock: {product?.stock}</strong>
          </p>
          <div className={styles.buttonContainer}>
            <button onClick={handleClick} className={styles.button}>
              <strong>Add to Be cart 🛒</strong>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default ProductDetailView;
