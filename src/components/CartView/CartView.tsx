"use client"; 
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
    <div className='bg-[url("/images/fullCartVale.jpg")] bg-cover bg-center w-full h-screen flex flex-col items-center justify-center'>
      {cart && cart.length > 0 ? (
        <div className="flex flex-col justify-center items-center gap-[10px] mt-[100px] ml-[20px] mr-[20px]">
          {cart.map(product => (
            <div key={product.id} className="flex justify-between items-center gap-[8px]">
              <div className="flex justify-between items-center bg-[#ffd700] w-[300px] sm:w-[550px] lg:w-[700px] xl:w-[950px] rounded-[7px] lg:p-[4px]">
                <div className="flex items-center justify-between ml-[10px] text-[14px] sm:text-[18px] gap-[4px]"><p className="hidden sm:block font-bold">Product:</p><p className="font-bold"><u>{product.name}</u></p></div>
                <p className="text-[14px] sm:text-[18px]">Price USD${(product.price * quantities[product.id])}</p>
                <div className="flex justify-between items-center gap-[10px] mr-[10px] text-[18px] sm:text-[20px]">
                        <button className="flex justify-center items-center font-bold" onClick={() => handleDecrease(product.id, setQuantities)} disabled={quantities[product.id] === 1}><strong> - </strong></button>
                        <p><strong>{quantities[product.id] || 0}</strong></p>
                        <button className="flex justify-center items-center font-bold" onClick={() => handleIncrease(product.id, setQuantities)}><strong> + </strong></button>
                </div>              
              </div>
              <button className="flex justify-center items-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[45px] lg:h-[45px] bg-white rounded-[8px] border-red-600 border-[4px] border-solid" onClick={() => handleDelete(product.id, cart, setCart)}>
                <img src="https://w7.pngwing.com/pngs/241/366/png-transparent-rubbish-bins-waste-paper-baskets-emoji-sticker-emoji-glass-waste-containment-waste.png" alt="delete" />
              </button>
            </div>
          ))}

          <div className="flex flex-col justify-center items-center gap-[10px] text-[14px] sm:text-[18px] lg:flex-row lg:gap-[40px] mt-[70px]">
            <p className="text-white bg-[#020530] w-fit p-[5px] hover:shadow-white hover:shadow-md"><strong>Total: USD${finalPrice}</strong></p>
            <button onClick={()=>openModal(setIsModalOpen)} className="bg-green-600 border-[4px] border-solid border-white p-[5px] rounded-[7px] hover:text-white"><strong>Select payment methods</strong></button>
            <button onClick={handleBuy} className="bg-[#030749] border-white text-white border-solid border-[4px] rounded-[7px] p-[5px] hover:text-white hover:shadow-white hover:shadow-md"><strong>Get your Be Product 🚀</strong></button>
          </div>

          <Modal isVisible={isModalOpen} onClose={()=>closeModal(setIsModalOpen)}>
            <h3 className="flex items-center text-[18px] lg:text-[20px] font-semibold ml-[10px] lg:ml-[30px]"><u>Available Payment Methods</u></h3>
            <ul className="list-none flex flex-col items-center gap-[8px] lg:text-[18px]">
              <li className="transition-all hover:bg-green-700 hover:rounded-[7px] p-[3px]"><strong><button onClick={handleMethod}>Credit Card 💳 6 installments all banks</button></strong></li>
              <li className="transition-all hover:bg-green-700 hover:rounded-[7px] p-[3px]"><strong><button onClick={handleMethod}>Cash 💵 Free Taxes (30% Disc.)</button></strong></li>
              <li className="transition-all hover:bg-green-700 hover:rounded-[7px] p-[3px]"><strong><button onClick={handleMethod}>Bank Transfer 🏧 20% Disc.</button></strong></li>
              <li className="transition-all hover:bg-green-700 hover:rounded-[7px] p-[3px]"><strong><button onClick={handleMethod}>Debit Card 💳 (20% Disc.)</button></strong></li>
            </ul>
          </Modal>
        </div>
      ) : (
        <Link href={homeRoute}>
          <p className="flex justify-center items-center bg-[#add8e6] text-center p-[5px] lg:p-[8px] text-[20px] ml-[10px] mr-[10px] rounded-[8px] mt-[150px]"><strong>You don't have products in your cart. <u className="text-blue-900 font-bold">Click me to add!!</u> 🎁🎁</strong></p>
        </Link>
      )}

      <div className="flex items-center justify-center p-[8px] m-auto border-solid border-[4px] border-blue-500 bg-white rounded-[8px] text-center mr-[10px] ml-[10px] text-[20px]">
        <p>Would you like to see your orders?? <Link href={ordersRoute}><u className="font-bold">Click here!</u>👋</Link></p>
      </div>
      <div className=""></div>
    </div>
  );
};

export default CartView;
