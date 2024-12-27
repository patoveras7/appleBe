import { IModalProps } from "@/interfaces/Types"

const Modal: React.FC<IModalProps> = ({isVisible, onClose, children}) => {
    if (!isVisible) return null;
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> 
        <div className="text-white relative bg-[rgb(3,7,73)] p-[10px] border-solid border-[4px] border-white rounded-[8px] transition-all hover:shadow-md hover:shadow-white">
            <button className="absolute top-2 right-2 lg:right-0.5 lg:top-0.5 text-white p-1 h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] hover:text-gray-700 hover:bg-red-500 hover:rounded-md " onClick={onClose}>X</button>
            <div className="flex flex-col gap-[30px]">
               {children}
            </div>
        </div>
     </div>
  )
}

export default Modal