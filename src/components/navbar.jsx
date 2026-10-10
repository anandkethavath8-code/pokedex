import { Link } from 'react-router-dom'
import { House,CircleDot,Heart,Swords } from 'lucide-react'

export default function Navbar() {
  return (
    <div className='w-full min-h-17 shadow-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex items-center justify-center sm:justify-start'>
            <img src='https://w7.pngwing.com/pngs/21/423/png-transparent-pokemon-go-pokeball-pokemon-circle-red-thumbnail.png'
            className='h-12 w-12 md:h-15 md:w-15 p-1 mt-1 rounded-full'></img>
            <p className='p-3 md:p-5 font-bold text-red-600 text-base md:text-xl'>Pokémon Explorer</p>
        </div>
        <div className='flex flex-wrap justify-center items-center gap-x-4 gap-y-2 px-2 py-3 sm:gap-3 md:gap-8 lg:gap-12 font-bold text-red-600 text-sm md:text-base'>
            <Link to="/" className="text-red-600 font-medium hover:font-bold hover:border-b-4 hover:border-blue pb-2"><div className='flex gap-2'><div className='pt-1'><House size={22} strokeWidth={1} /></div>Home</div></Link>
            <Link to="/pokemon" className="text-red-600 font-medium hover:font-bold hover:border-b-4 hover:border-blue pb-2"><div className='flex gap-2'><div className='pt-1'><CircleDot size={22} strokeWidth={1} /></div>Pokémon</div></Link>
            <Link to="/Favourite" className="text-red-600 font-medium hover:font-bold hover:border-b-4 hover:border-blue pb-2"><div className='flex gap-2'><div className='pt-1'><Heart size={22} strokeWidth={0.75} className="fill-pink-500" /></div>Favourite</div></Link>
            <Link to="/pokemonfight" className="text-red-600 font-medium hover:font-bold hover:border-b-4 hover:border-blue pb-2"><div className='flex gap-2'><div className='pt-1'><Swords size={22} strokeWidth={0.75} className="fill-gray-500" /></div>Let's Fight</div></Link>
        </div>
    </div>
  )
}
