const APIURL = process.env.NEXT_PUBLIC_API_URL;


export async function createOrder(products: number[], token: string) {
    try {
        const response = await fetch(`${APIURL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,            },
            body: JSON.stringify({
                products
            }),
        });

        const orders = await response.json();
        return orders;

        
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export async function getOrders(token: string) {
    try {
        const response = await fetch(`${APIURL}/users/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,         
            },
         
        });
        const orders = await response.json();
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}