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
    
    
    
   
  )
}

export default CategoriesDetailView