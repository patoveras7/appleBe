import Link from 'next/link'
import { ICategory } from "@/interfaces/Types"



const CardCategory: React.FC<ICategory> = ({name, image, id}) => {



  return (
    <Link href={`/products/${id}`}><div className="flex felx-col justify-center items-center relative h-[310px] w-[240px] rounded-[1.5em] border-2 border-white my-4 overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-white">
        <div className="text-[24px] z-20 bg-black text-white border-[2px] border-solid border-white rounded-[4px] p-[8px] mx-auto"><strong>{name}</strong></div>
        <img className="absolute w-full h-full object-cover" src={image} alt="category" />
    </div></Link>
  )
}

export default CardCategory
