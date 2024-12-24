import { getProductsDB } from '@/helpers/product.helpers';
import CardProduct from '../cards/CardProduct';
import React from 'react';

export const ProductsList = async () => { 
const products = await getProductsDB();
//debugger
  return (
   
    <>
            <div className="w-full h-sreen p-[10px_30px_10px_35px] flex items-center justify-around flex-wrap gap-[30px] bg-slate-700">     
            {
                products &&
                products?.map((product) => {
                  return (
                  <CardProduct key={product.id} {...product}/> 
                  )
                })
          }
          </div>
 </>

  )
}

export default ProductsList