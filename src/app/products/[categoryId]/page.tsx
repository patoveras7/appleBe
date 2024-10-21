import CategoriesDetailView from "@/views/HomeContainer/CategoriesDetail/CategoriesDetailView"


const page = ({params}: {params:{categoryId: string}}) => {
    
  return (
       
    <CategoriesDetailView categoryId={params.categoryId}/>
  
  )
}

export default page
