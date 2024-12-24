import ProductDetailView from "@/components/ProductDetail/ProductDetailView"

const page = ({params}: {params:{productId: string}}) => {
  
  
  return (
       
    <ProductDetailView productId={params.productId}/>
    

  )

}

export default page



