import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='w-full h-17 shadow-2xl flex justify-between'>
        <div className='flex'>
            <img src='https://w7.pngwing.com/pngs/21/423/png-transparent-pokemon-go-pokeball-pokemon-circle-red-thumbnail.png'
            className='h-12 w-12 md:h-15 md:w-15 p-1 mt-1 rounded-full'></img>
            <p className='p-3 md:p-5 font-bold text-red-600 text-base md:text-xl'>Pokémon Explorer</p>
        </div>
        <div className='p-3 pr-2 md:p-5 md:pr-20 flex gap-3 md:gap-15 font-bold text-white text-sm md:text-xl'>
            <Link to="/" className="text-red-600 font-medium hover:font-bold hover:border-b-4 hover:border-blue pb-2">Home</Link>
            <Link to="/pokemon" className="text-red-600 font-medium hover:font-bold hover:border-b-4 hover:border-blue pb-2">Pokémon</Link>
            <Link to="/Favourite" className="text-red-600 font-medium hover:font-bold hover:border-b-4 hover:border-blue pb-2">Favourite</Link>
        </div>
    </div>
  )
}
