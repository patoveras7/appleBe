import { IProduct } from "@/interfaces/Types";
import Swal from "sweetalert2";

export const handleMethod = () => {
    Swal.fire({
      title: "The Payment Method has been selected",
      width: 400,
      padding: "3em",
    });
  };

  export const handleDecrease = (
    id: number, 
    setQuantities: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1), // No permitir que la cantidad sea menor a 1
    }));
  };

  export const handleIncrease = (
    id: number,
    setQuantities: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>
) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  export const handleDelete = (
    id: number,
    cart: IProduct[],
    setCart: React.Dispatch<React.SetStateAction<IProduct[]>>
) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  export const openModal = (setIsModalOpen: React.Dispatch<React.SetStateAction<(boolean)>>) => setIsModalOpen(true);
  
  export const closeModal = (setIsModalOpen: React.Dispatch<React.SetStateAction<(boolean)>>) => setIsModalOpen(false);

  export const calculateFinalPrice = (cart: IProduct[], quantities: { [key: number]: number; }, setFinalPrice:React.Dispatch<React.SetStateAction<(number)>>) => {
    const total = cart.reduce((accumulator, product) => {
      const quantity = quantities[product.id] || 0;
      return accumulator + product.price * quantity;
    }, 0);
    setFinalPrice(total);
  };