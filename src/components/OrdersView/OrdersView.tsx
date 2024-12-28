"use client";
import Modal from "@/components/modals/ordersModal";
import { homeRoute } from "@/helpers/routes";
import { getOrders } from '@/helpers/orders.helpers';
import { IOrder, IUserSession } from '@/interfaces/Types'
import Link from "next/link";
import React, { useEffect, useState } from 'react'

const OrdersView = () => {

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [userData, setUserData] = useState<IUserSession | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const openModal = () => {setModalIsOpen(true)}
  const closeModal = () => {setModalIsOpen(false)}

  useEffect(()=>{
    if(typeof window !== "undefined" && window.localStorage){
      const data = JSON.parse(localStorage.getItem("userSession")!)
      setUserData(data)
    };    
  }, [])  
  
  const newFetch = async () => {
  const response = await getOrders(userData?.token!)
    setOrders(response)
  }

  useEffect(() => {
    if (userData) {
      newFetch(); 
    }
  }, [userData]);

  console.log(userData)

  return (
    <>    <div className='bg-[url("/images/ordersVale.jpg")] bg-cover bg-center w-full min-h-screen flex flex-col items-center justify-center gap-[35px] p-[4px] pt-[50px] pb-[50px]'>
            {
                          orders && orders.length > 0 ? (
                          orders?.map((order) => {
                            return(
                            <div key={order.id} className="border-solid border-[4px] border-white rounded-[7px] p-[4px] bg-[#020530] ml-[4px] mr-[4px]"> 
                            <div className="flex flex-col gap-[8px]">
                              <p className="flex justify-center items-center text-white sm:text-[20px]"><strong>Order number: {order.id}</strong></p>
                              <p className="flex justify-center border-solid border-[4px] border-white w-fit m-auto text-white p-[3px] text-[14px] sm:text-[18px] text-center"><strong>{new Date(order.date)?.toString()}</strong></p>
                              <p className="flex justify-center border-solid border-[4px] border-white w-fit m-auto text-white p-[3px] text-[14px] sm:text-[18px] bg-green-800"><strong>Status: {order.status} ✔ 🆗</strong></p>  
                              {
                                order.products.map((product) => {
                                  return(
                                  <div key={product.id} className="flex flex-col gap-[5px] border-solid border-[4px] border-white rounded-[7px] bg-[#ffd700] p-[4px] text-[14px] sm:text-[16px] text-center">
                                    <p className="flex justify-center items-center"><strong>Product: "{product.name}"</strong></p>
                                    <p className="flex justify-center items-center">🔜🚚 in your place...<strong>{userData?.user.address}</strong></p>
                                    <button onClick={openModal} className="bg-[#030749] border-[#20a2f3] border-solid border-[4px] rounded-[7px] p-[4px] text-white m-auto">Check Location</button>
                                  </div>
                                  )
                                })
                              }
                            </div>
                            <Modal isVisible={modalIsOpen} onClose={closeModal}>
                            <p className="flex justify-center items-center border-solid border-[4px] border-white w-fit m-auto p-[2px] bg-[#ffd700] text-[#030749] text-[14px] sm:text-[16px] lg:text-[18px]">Currently in...<strong>packing area 📦📦</strong></p>
                            </Modal>
                            </div>
                            )
                          })
                    ) : ( 
                            <Link href={homeRoute}><p className="flex justify-center items-center"><strong>You don't have orders yet.... <u>Click me to buy!!</u> 🎁🎁</strong></p></Link>
                           )  

            }
    </div>
    </>

  )
}

export default OrdersView