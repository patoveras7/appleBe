import { IProduct } from "@/interfaces/Types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProduct[]> {
    try{
       
        const response = await fetch(`${APIURL}/products`, {
            next: {revalidate: 1200}
        });
        const products: IProduct[] = await response.json(); 
        return products
    } catch (error: any){
        throw new Error(error)
    }
};



export async function getProductById(id: string): Promise<IProduct> {
    try{
       const products: IProduct[] = await getProductsDB();
       const product = products.find((product) => product.id.toString() === id);
       if (!product) throw new Error("Product not found");
       return product
    } catch (error: any){
        throw new Error(error)
    }
};
export async function getCategoriesById(id: string): Promise<IProduct[]> {
    try {
        const allProducts: IProduct[] = await getProductsDB();
        const productsByCategory = allProducts.filter((product) => product.categoryId.toString() === id);
        if (productsByCategory.length === 0) throw new Error("No products found for this category");
        return productsByCategory;
    } catch (error: any) {
        throw new Error(error);
    }
}








