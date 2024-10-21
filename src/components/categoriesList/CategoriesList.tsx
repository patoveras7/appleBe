import styles from '../../styles/cardList.module.css'
import categoriesToPreLoad from "@/helpers/categories"
import CardCategory from "../cards/CardCategory";

const CategoriesList  = () => { 

const categories = categoriesToPreLoad;



  return ( 
    <>
         <div className={styles.cardsContainer}>
    {
        categories &&
        categories?.map((categorie) => {
          return (
          <CardCategory key={categorie.id} {...categorie}/>
          )
        })
  }
 </div>
 <div className={styles.background}></div>
  </>
  )
}

export default CategoriesList