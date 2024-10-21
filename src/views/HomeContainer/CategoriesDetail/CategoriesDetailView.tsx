import styles from "../../../styles/cardList.module.css"
import CardProduct from "@/components/cards/CardProduct";
import categoriesToPreLoad from "@/helpers/categories";
import { getCategoriesById } from "@/helpers/product.helpers";
import { notFound } from "next/navigation";


const CategoriesDetailView = async ({categoryId}: {categoryId: string}) => {

    const paramCategory = parseInt(categoryId)

    const foundCategory = categoriesToPreLoad.find(category => category.id === paramCategory)

    if(!foundCategory) notFound();
   
    const products = await getCategoriesById(categoryId);
    

    
    
  
    return (
    <>
    <div className={styles.cardsContainer}>
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

export default CategoriesDetailView