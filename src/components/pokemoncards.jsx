import { useEffect, useState } from 'react'

export default function Pokemoncards({pokemon}) {
    const [data, setData] = useState(null)

    const typeColors = {
            normal: "bg-gray-400",
            fire: "bg-red-500",
            water: "bg-blue-500",
            electric: "bg-yellow-400",
            grass: "bg-green-500",
            ice: "bg-cyan-300",
            fighting: "bg-red-700",
            poison: "bg-purple-500",
            ground: "bg-yellow-600",
            flying: "bg-indigo-300",
            psychic: "bg-pink-500",
            bug: "bg-lime-500",
            rock: "bg-stone-500",
            ghost: "bg-purple-700",
            dragon: "bg-indigo-700",
            dark: "bg-gray-800",
            steel: "bg-slate-500",
            fairy: "bg-pink-300"
        }
    useEffect(() => {
        if(!pokemon) return
        console.log(pokemon)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
    }, [pokemon])
    if (!data) {
      return <h1>Loading...</h1>
    }
    return (
    <div>
      <div >
        <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(data.id).padStart(3, '0')}.png`}
          alt={data.name}
          className='object-contain w-full h-35'
        />
      </div>
      <p>#{data.id}</p>
      <h2 className='font-bold capitalize'>{data.name}</h2>
      <div className='flex flex-wrap gap-2 md:gap-4'>
      {data.types?.map((data,index)=>(
        <p key={index} className={`${typeColors[data.type?.name]} h-8 w-20 px-2 rounded-full capitalize whitespace-nowrap flex items-center justify-center text-sm`}>{data.type?.name}</p>
      ))}
      </div> 
    </div>
  )
}