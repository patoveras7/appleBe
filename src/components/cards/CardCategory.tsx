import Link from 'next/link'
import { ICategory } from "@/interfaces/Types"



const CardCategory: React.FC<ICategory> = ({name, image, id}) => {



  return (
    <Link href={`/products/${id}`}><div className="flex justify-center flex-col relative text-center w-[21em] h-[28em] rounded-[1.5em] border-2 border-white my-[1em] overflow-hidden transition-transform duration-1000 hover:scale-125 hover:z-10 group relative">
        <div className="text-[1.5em] z-20 bg-black text-white border-2 border-solid border-white rounded-lg p-3 mx-auto hidden group-hover:block"><strong>{name}</strong></div>
        <img className="absolute top-0 left-0 w-full h-full object-cover z-[1]" src={image} alt="category" />
    </div></Link>
  )
}

export default CardCategory
