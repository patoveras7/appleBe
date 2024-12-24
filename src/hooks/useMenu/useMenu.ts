import { useCallback, useRef, useState } from "react"


export const useMenu = (): {isOpen: boolean, closeMenu: () => void, toggleMenu: () => void, menuRef: React.RefObject<HTMLDivElement>, buttonRef: React.RefObject<HTMLButtonElement>} =>{

    const menuRef = useRef<HTMLDivElement | null>(null);
    const[isOpen, setIsOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const closeMenu = useCallback(() => setIsOpen(false), []);
    const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    return {isOpen, closeMenu, toggleMenu, menuRef, buttonRef};



}