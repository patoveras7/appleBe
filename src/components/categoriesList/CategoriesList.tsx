import categoriesToPreLoad from "@/helpers/categories"
import CardCategory from "../cards/CardCategory";

const CategoriesList  = () => { 

const categories = categoriesToPreLoad;



  return ( 
    
    <div className="w-full h-sreen p-[10px_30px_10px_35px] flex items-center justify-around flex-wrap gap-[30px] bg-slate-700">
      
    {
        categories &&
        categories?.map((categorie) => {
          return (
          <CardCategory key={categorie.id} {...categorie}/>
          )
        })
  }
 </div>

  
  )
}

export default CategoriesList