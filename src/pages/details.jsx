import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Details() {
  const {name}=useParams()
  const [data,setData]=useState("")
  const [des,setDes]=useState("")

  const statColors = {
  hp: "bg-red-400",
  attack: "bg-orange-400",
  defense: "bg-yellow-400",
  "special-attack": "bg-blue-400",
  "special-defense": "bg-blue-400",
  speed: "bg-pink-400"
}
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

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(Response=>Response.json())
    .then(data=>{
      setData(data)
    })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(response => response.json())
    .then(data => {
      const engdes=data.flavor_text_entries.find(
        item=>item.language.name==="en"
      );
      if(engdes){
        setDes(engdes.flavor_text.replace(/[\n\f]/g, " "))
      }
    });


  },[name])

  if (!data) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='shadow-2xl bg-white/90 w-full max-w-250 min-h-180 mx-auto mt-10 md:mt-30 rounded-4xl flex flex-col gap-5 p-4'>
      <div className='flex flex-col md:flex-row gap-5 md:gap-10'>
      <div className='w-full md:w-120 ml-0 md:ml-10 h-90'>
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(data.id).padStart(3, '0')}.png`} 
        className='h-80 w-80 md:h-100 md:w-100 mx-auto md:ml-15'
        />
      </div>
      <div className='font-[poppins] w-full md:w-100 h-auto md:h-90 p-5 md:p-10 flex flex-col gap-2'>
        <h2 className='font-bold capitalize text-3xl'>{data.name}<span className='ml-3 text-gray-500 text-xl font-normal'>#{data.id}</span></h2>
        <div className='flex flex-wrap gap-2 md:gap-4'>
          {data.types?.map((data,index)=>(
            <p key={index} className={`${typeColors[data.type?.name]} h-9 capitalize w-20 px-4 rounded-full whitespace-nowrap flex items-center justify-center`}>{data.type?.name}</p>
          ))}
        </div>
        <p className='font-semibold'>Height: <span className='ml-1 font-normal'>{data.height}</span></p>
        <p className='font-semibold'>Weight: <span className='ml-1 font-normal'>{data.weight}</span></p>
        <p className='font-semibold'>Abilities: </p>
        <ul>
          {data.abilities?.map((item,index)=>(
            <li key={index}>
            {item.ability.name}
            </li>
          ))}
        </ul>
        <div className='mt-3 '>
        <p className='font-normal'>
          {des}
        </p>
        </div>
        </div>
      </div>
      <div className='h-auto w-full md:w-200 mt-6 ml-0 md:ml-30'>
        <div>
          <h2 className="font-bold text-xl mb-4"><u>Base Stats</u></h2>
          {data.stats?.map((item,index)=>(
            <div key={index} className='flex items-center gap-2 md:gap-4 mb-2'>
              <p className='w-24 font-semibold'>{item.stat.name}</p>
              <div className="w-full md:w-150 h-4 bg-gray-200 rounded-full">
              <div className={`h-4 ${statColors[item.stat.name]} rounded-full`}
                  style={{
                  width: `${(item.base_stat / 255) * 100}%`
          }}
          ></div>
              </div>
              <p className="w-8">{item.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
