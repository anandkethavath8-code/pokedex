import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Pokemoncards from '../components/pokemoncards'
import { Search,Heart } from 'lucide-react';
import {Link, useSearchParams } from 'react-router-dom'
import Types from '../components/types';

export default function Pokemon({favourites,setFavourites}) {
    const [search, setSearch] = useState("")
    const [pokemon, setPokemon] = useState([])
    const [generation,setGeneration]=useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(true)

    const [searched]=useSearchParams()
    const urlsearch =searched.get("search")

    const handler=()=>{
        if(search.trim()==="") return
        const name=search.toLowerCase().trim()

        fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(response=>{
            if(!response.ok){
                throw new Error("pokemon not found")
            }
            return response.json()
        }).then(()=>{
            setPokemon([name])
        }).catch(()=>{
            alert("pokemon not found")
        })
    }

    useEffect(() => {
            if(urlsearch){
                setPokemon([urlsearch])
                return
            }
            fetch("https://pokeapi.co/api/v2/pokemon?limit=24")
                .then(response =>{
                    if(!response.ok){
                        throw new Error("pokemon not found")
                    }
                    return response.json()
                })
                .then(data => {
                    setPokemon(data.results.map(item => item.name))
                }).catch(()=>{
                    alert("pokemon not found")
                })
        }, [urlsearch])

    useEffect(() => {
            if (!generation) return;
            fetch(`https://pokeapi.co/api/v2/generation/${generation}/`)
                .then(response => response.json())
                .then(data => {
                    setPokemon(data.pokemon_species.map(item => item.name))
                })
        }, [generation])
    
    useEffect(() => {
            fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
            .then(res => res.json())
            .then(data => setSuggestions(data.results.map(item => item.name)))
        }, [])

        function favpokemon(name){
            if(favourites.includes(name)){
                setFavourites(favourites.filter(item=>item!=name))
            }else{
                setFavourites([...favourites,name])
            }
        }

  return (
    <div >
            <Navbar/>
          <div className='pt-7 ml-4 md:ml-10'>
            <h2 className='font-bold text-2xl'>Pokédex</h2>
            <p className='text-sm'>Browse and discover all pokemon</p>
            <div className='mt-5 w-full max-w-250 flex flex-col md:flex-row gap-3 md:gap-0'>
            <div className="relative w-full">
            <Search strokeWidth={1} className="absolute left-5 top-1/2 -translate-y-1/2"/>
            <input type="text" value={search} placeholder='Search Pokemon by name or number'
            className='w-full h-13 rounded-full pl-15 bg-white/90 shadow-md'
            onChange={(e) => {
                setSearch(e.target.value)
                setShowSuggestions(true)
            }}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
                handler()
                }
            }}
            />
            {search.trim() && showSuggestions && (
                <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl bg-white shadow-lg overflow-hidden">
                    {
                        suggestions.filter(name=> name.startsWith(search.toLowerCase().trim()))
                        .slice(0,5)
                        .map(name=>(
                            <button
                            key={name}
                            className='block w-full px-5 py-3 text-left capitalize hover:bg-gray-100'
                            onClick={()=>{
                                setSearch(name)
                                setPokemon([name])
                                setShowSuggestions(false)
                            }}
                            >
                                {name}
                            </button>
                        ))
                    }
                </div>
            )}
            </div>
            <button onClick={handler} className='ml-0 md:ml-10 w-30 h-13 rounded-full shadow-md bg-white/90'>Search</button>
          </div>
        </div>
        <Types setPokemon={setPokemon} generation={generation} setGeneration={setGeneration}/>
        <div className='flex flex-wrap justify-center gap-6 md:gap-12 p-3 md:p-5'>
            {pokemon.map((item)=>(
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
