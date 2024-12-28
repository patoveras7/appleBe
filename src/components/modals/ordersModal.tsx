import { IModalProps } from "@/interfaces/Types"

const Modal: React.FC<IModalProps> = ({isVisible, onClose, children}) => {
    if (!isVisible) return null;
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> 
        <div className="text-white relative bg-[rgb(3,7,73)] p-[30px] border-4 border-white rounded-lg shadow-lg w-fit max-w-lg transition-shadow hover:shadow-[0_0_1em_white] ml-[8px] mr-[8px]">
            <button className="absolute top-1 right-1.5 text-white  h-[24px] w-[24px] hover:text-gray-700 hover:bg-red-500 hover:rounded-md " onClick={onClose}>X</button>
            <div className="flex flex-col gap-7">
               {children}
            </div>
        </div>
     </div>
  )
}

export default Modal