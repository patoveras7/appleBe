"use client"; 
import styles from "../../../styles/cart.module.css";
import { homeRoute, ordersRoute } from "@/helpers/routes";
import { createOrder } from "@/helpers/orders.helpers";
import { IProduct, IUserSession } from "@/interfaces/Types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "@/components/modals/cartModal";
import { useRouter } from "next/navigation";
import { calculateFinalPrice, closeModal, handleMethod, openModal } from "@/helpers/cart.helpers";
import { handleDecrease, handleIncrease, handleDelete } from "@/helpers/cart.helpers";

const CartView = () => {


  const router = useRouter();

  const [cart, setCart] = useState<IProduct[]>([]);
  const [dataUser, setDataUser] = useState<IUserSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [finalPrice, setFinalPrice] = useState<number>(0);
  

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storageCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storageCart);
      const initialQuantities: { [key: number]: number } = {};
      storageCart.forEach((product: IProduct) => {
        initialQuantities[product.id] = 1; 
      });
      setQuantities(initialQuantities);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const user = JSON.parse(localStorage.getItem("userSession") || "[]");
      setDataUser(user);
    }
  }, []);

  useEffect(() => {
    calculateFinalPrice(cart, quantities, setFinalPrice);
  }, [quantities, cart]);
    

  const handleBuy = async () => {
    const idProducts = cart.map((product) => product.id);
    await createOrder(idProducts, dataUser?.token!);
    Swal.fire({
      title: "Buy Successfully. Your products are on their way 🚐🚐",
      width: 400,
      padding: "3em",
    });
    setCart([]);
    localStorage.removeItem("cart");
    router.push("/dashboard/orders");
  };



  return (
    <div>
      {cart && cart.length > 0 ? (
        <div className={styles.cartContainer}>
          {cart.map(product => (
            <div key={product.id} className={styles.productsContainer}>
              <div className={styles.linesProducts}>
                <p><strong>Product: </strong>{product.name}</p>
                <p><strong>Price USD${(product.price * quantities[product.id])}</strong></p>
                <button className={styles.decraseIncreaseButton} onClick={() => handleDecrease(product.id, setQuantities)} disabled={quantities[product.id] === 1}><strong> - </strong></button>
                <p><strong>{quantities[product.id] || 0}</strong></p>
                <button className={styles.decraseIncreaseButton} onClick={() => handleIncrease(product.id, setQuantities)}><strong> + </strong></button>
              </div>
              <button className={styles.delete} onClick={() => handleDelete(product.id, cart, setCart)}>
                <img src="https://w7.pngwing.com/pngs/241/366/png-transparent-rubbish-bins-waste-paper-baskets-emoji-sticker-emoji-glass-waste-containment-waste.png" alt="delete" />
              </button>
            </div>
          ))}

          <div className={styles.lastClick}>
            <p className={styles.finalPrice}><strong>Total: USD${finalPrice}</strong></p>
            <button onClick={()=>openModal(setIsModalOpen)} className={styles.button2}><strong>Select payment methods</strong></button>
            <button onClick={handleBuy} className={styles.button}><strong>Get your Be Product 🚀</strong></button>
          </div>

          <Modal isVisible={isModalOpen} onClose={()=>closeModal(setIsModalOpen)}>
            <h3 className="text-xl font-semibold mb-4">Available Payment Methods</h3>
            <ul className="list-none flex flex-col">
              <li className={styles.method}><strong><button onClick={handleMethod}>Credit Card 💳 6 installments all banks</button></strong></li>
              <li className={styles.method}><strong><button onClick={handleMethod}>Cash 💵 Free Taxes (30% Disc.)</button></strong></li>
              <li className={styles.method}><strong><button onClick={handleMethod}>Bank Transfer 🏧 20% Disc.</button></strong></li>
              <li className={styles.method}><strong><button onClick={handleMethod}>Debit Card 💳 (20% Disc.)</button></strong></li>
            </ul>
          </Modal>
        </div>
      ) : (
        <Link href={homeRoute}>
          <p className={styles.cartEmpty}><strong>You don't have products in your cart. <u>Click me to add!!</u> 🎁🎁</strong></p>
        </Link>
      )}

      <div className={styles.linkOrders}>
        <p>Would you like to see your orders?? <Link href={ordersRoute}><strong><u>Click here!</u>👋</strong></Link></p>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default CartView;
