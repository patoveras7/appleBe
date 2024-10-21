"use client";
import Modal from "@/components/modals/ordersModal";
import styles from "../../../styles/orders.module.css"
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
    <>    <div className={styles.ordersContainer}>
            {
                          orders && orders.length > 0 ? (
                          orders?.map((order) => {
                            return(
                            <div key={order.id} className={styles.orderCard}> 
                            <div className={styles.space}>
                              <p className={styles.orderNumber}><strong>Order number: {order.id}</strong></p>
                              <p className={styles.checkDate}><strong>{new Date(order.date)?.toString()}</strong></p>
                              <p className={styles.checkStatus}><strong>Status: {order.status} ✔ 🆗</strong></p>  
                              {
                                order.products.map((product) => {
                                  return(
                                  <div key={product.id} className={styles.space2}>
                                    <p className={styles.check2}><strong>Product: "{product.name}"</strong></p>
                                    <p className={styles.check2}>🔜🚚 in your place...<strong>{userData?.user.address}</strong></p>
                                    <button onClick={openModal} className={styles.button}>Check Location</button>
                                  </div>
                                  )
                                })
                              }
                            </div>
                            <Modal isVisible={modalIsOpen} onClose={closeModal}>
                            <p className="flex justify-center items-center">Currently in...<strong>packing area 📦📦</strong></p>
                            </Modal>
                            </div>
                            )
                          })
                    ) : ( 
                            <Link href={homeRoute}><p className={styles.checkEmpty}><strong>You don't have orders yet.... <u>Click me to buy!!</u> 🎁🎁</strong></p></Link>
                           )  

            }
    </div>
    <div className={styles.background}></div>
    </>

  )
}

export default OrdersView