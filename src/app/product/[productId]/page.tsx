import ProductDetailView from "@/views/HomeContainer/ProductDetail/ProductDetailView"

const page = ({params}: {params:{productId: string}}) => {
  
  
  return (
       
    <ProductDetailView productId={params.productId}/>
    

  )

}

export default page



