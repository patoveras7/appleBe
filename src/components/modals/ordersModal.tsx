import { IModalProps } from "@/interfaces/Types"

const Modal: React.FC<IModalProps> = ({isVisible, onClose, children}) => {
    if (!isVisible) return null;
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> 
        <div className="text-white relative bg-[rgb(3,7,73)] p-12 border-4 border-white rounded-lg shadow-lg w-full max-w-lg transition-shadow hover:shadow-[0_0_1em_white]">
            <button className="absolute top-2 right-2 text-white p-1 h-[2em] w-[2em] hover:text-gray-700 hover:bg-red-500 hover:rounded-md " onClick={onClose}>X</button>
            <div className="flex flex-col gap-7">
               {children}
            </div>
        </div>
     </div>
  )
}

export default Modal