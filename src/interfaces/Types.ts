export interface ICategory {
    name: string,
    id: number,
    image: string

}

export interface IProduct{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

export interface ILoginProps {

    email: string;
    password: string;

}

export interface ILoginErrors {

    email?: string;
    password?: string;
}

export interface IRegisterProps {

    name: string,
    address: string,
    phone: string  
    email: string,
    password: string,
    confirmPassword: string

}

export interface IRegisterErrors{

    name?: string,
    address?: string,
    phone?: string  
    email?: string,
    password?: string,
    confirmPassword?: string

}

export interface IUserSession {
    token: string,
    user: {
        address: string,
        email: string,
        id: number,
        name: string,
        phone: string,
        role: string,
        orders: []
    }


}

export interface IOrder {
    id: number, 
    status: string, 
    date: Date,
    products: IProduct[]
}

export interface IModalProps {

       isVisible: boolean,
       onClose: () => void,
       children: React.ReactNode 

}