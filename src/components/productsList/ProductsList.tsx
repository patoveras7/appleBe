import styles from '../../styles/cardList.module.css'
import { getProductsDB } from '@/helpers/product.helpers';
import CardProduct from '../cards/CardProduct';
import React from 'react';

export const ProductsList = async () => { 
const products = await getProductsDB();
//debugger
  return (
   
    <>
    <div className="relative w-full h-full p-[2em_4em_3.5em_4em] flex items-center justify-around flex-wrap gap-[3em]">     
    {
        products &&
        products?.map((product) => {
          return (
          <CardProduct key={product.id} {...product}/> 
          )
        })
  }
  </div>
  <div className={styles.background}></div>
  </>

  )
}

export default ProductsList