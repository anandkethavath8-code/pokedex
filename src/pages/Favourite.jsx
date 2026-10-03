import Navbar from '../components/navbar'
import Pokemoncards from '../components/pokemoncards'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Favourite({favourites,setFavourites}) {
  function favpokemon(name){
      if(favourites.includes(name)){
          setFavourites(favourites.filter(item=>item!=name))
      }else{
          setFavourites([...favourites,name])
          }
      }
  return (
    <div>
      <Navbar/>
      <div className='flex flex-wrap justify-center gap-6 md:gap-12 p-3 md:p-5'>
            {favourites.map((item)=>(
                <div
                    key={item}
                    className='w-45 md:w-50 h-66 p-3 shadow-2xl rounded-xl bg-white/90'>
                    <Heart strokeWidth={1} 
                    onClick={()=>favpokemon(item)}
                    className={favourites.includes(item) ? "fill-pink-500":"bg-white"}
                    />
                    <Link key={item} to={`/details/${item}`}>
                    <Pokemoncards pokemon={item} />
                    </Link>
                </div>
            ))}
    </div>
    </div>
  )
}
