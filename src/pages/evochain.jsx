import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Pokemoncards from '../components/pokemoncards'

export default function Evochain({favourites,setFavourites}) {
    const {name}=useParams()
    const [evoname,setEvoname]=useState([])
    useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(Response => Response.json())
  .then(data => {
    fetch(data.species.url)
      .then(Response => Response.json())
      .then(data => {
        fetch(data.evolution_chain.url)
          .then(Response => Response.json())
          .then(data => {
            function getEvoNames(chain) {
              let names = [chain.species.name];

              for (let evo of chain.evolves_to) {
                names.push(...getEvoNames(evo));
              }

              return names;
            }

            setEvoname(getEvoNames(data.chain));
          });
      });
  })},[name]);

  function favpokemon(item) {
    if (favourites.includes(item)) {
        setFavourites(favourites.filter(p => p !== item));
    } else {
        setFavourites([...favourites, item]);
    }
}

  return (
    <div>
        <div className='flex flex-wrap justify-center gap-6 md:gap-12 p-3 md:p-5'>
            {evoname.map((item)=>(
                <div
                    key={item}
                    className='w-45 md:w-50 h-66 p-3 shadow-2xl rounded-xl bg-white/90'>
                    <Heart strokeWidth={1} 
                    onClick={()=>favpokemon(item)}
                    className={favourites.includes(item) ? "fill-pink-500 text-pink-500" : "text-gray-500"}
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
