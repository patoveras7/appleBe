import { ILoginErrors, ILoginProps, IRegisterErrors, IRegisterProps } from "@/interfaces/Types";

// LOGIN validation.
export function validateLoginErrors (data: ILoginProps) {
    const errors: ILoginErrors = {};

    if (!data.email) {
        errors.email = "The email is required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(data.email)) {
        errors.email = "No tiene formato email";
    }

    if (!data.password) {
        errors.password = "La contraseña es requerida";
    } else if (data.password.length < 6) {
        errors.password = "Debe tener mínimo 6 caracteres";
    }
    return errors;
}

//  LOGIN Submit activation.
export const validateLoginForm = (state: ILoginProps) => {
        
    return Object.values(state).every(field => field !== '');
      
}

// REGISTER validation.
export const validateRegisterErrors = (userData: IRegisterProps) => {

    const errors: IRegisterErrors = {};

    if (!userData.name) {
        errors.name = "The name is required";
    } else if (/[0-9]/.test(userData.name)) {
        errors.name = "No numbres, only letters";
    } else if (/[^A-Za-zÀ-ÿ\s]/.test(userData.name)) {
        errors.name = "No special characters, only letters";
    } else if (userData.name.length < 3) {
        errors.name = "You have to write 3 caracters at least";
    }

    if (!userData.address) {
        errors.address = "The address is required";
    } else if (/^[A-Za-zÀ-ÿ\s]+$/.test(userData.address)) {
        errors.address = "No special characters, only letters and numbers";
    } else if (userData.address.length < 3) {
        errors.address = "You have to write 3 caracters at least";
    }

    const celPhone = Number(userData.phone);
    
    if (!userData.phone) {
        errors.phone = "The phone is required";
    } else if (isNaN(celPhone)) { // DNI arrive like string. 
        errors.phone = "The phone isn't valid";
    } else if (userData.phone.length < 9) {
        errors.phone = "The phone needs more than 9 digits";
    }
    
    
    if (!userData.email) {
        errors.email = "El email es requerido";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(userData.email)) {
        errors.email = "No tiene formato email";
    }
    

    if (!userData.password) {
        errors.password = "La contraseña es requerida";
    } else if (userData.password.length < 6) {
        errors.password = "Debe tener mínimo 6 caracteres";
    }

    if (userData.confirmPassword && userData.confirmPassword !== userData.password) {
        errors.confirmPassword = "Las contraseñas no coinciden";
      }

    return errors;

};


// REGISTER submit activation.

 export const validateRegisterForm = (state: IRegisterProps, errors: IRegisterErrors): boolean => { 
        
   const completeImputs =  Object.values(state).every(field => field !== '');
   const errorsImputs = Object.keys(errors).length === 0;
   return completeImputs && errorsImputs;
      
}

