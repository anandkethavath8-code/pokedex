import {ChevronDown} from "lucide-react"

export default function Types({setPokemon,generation,setGeneration}) {
  
  const getpokemon=(type)=>{
           if (!type) {
            fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
                .then(response => response.json())
                .then(data => {
                    setPokemon(data.results.map(item => item.name))
                })
            return
           }

          fetch(`https://pokeapi.co/api/v2/type/${type}`)
          .then(response=>{
            if(!response.ok){
              throw new Error("type not found")
            }
            return response.json()})
          .then(data=>{
            setPokemon(data.pokemon.map(item => item.pokemon.name))
          })
          .catch(()=>{
            alert("Pokemon Type Not Found")
          })
      }

  return (
    <div className="mt-2 w-full min-h-20 flex flex-wrap items-center justify-center gap-3 md:gap-10 px-3 md:px-5">
      <button
        className="w-24 h-12 rounded-full font-bold bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-200"
        onClick={() => getpokemon(false)}
      > ALL</button>
      
      <button
        className="w-24 h-12 rounded-full font-bold bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-md transition duration-200"
        onClick={() => getpokemon("fire")}
        >FIRE</button>
      <button
        className="w-24 h-12 rounded-full font-bold bg-blue-400 text-white shadow-sm hover:bg-blue-500 hover:shadow-md transition duration-200"
        onClick={() => getpokemon("water")}
      >WATER</button>
      <button
        className="w-24 h-12 rounded-full font-bold bg-green-400 text-white shadow-sm hover:bg-green-500 hover:shadow-md transition duration-200"
        onClick={() => getpokemon("grass")}
      >GRASS</button>
      <button
        className="w-24 h-12 rounded-full font-bold bg-yellow-400 text-gray-800 shadow-sm hover:bg-yellow-500 hover:shadow-md transition duration-200"
        onClick={() => getpokemon("electric")}
      >ELECTRIC</button>
      <button
        className="w-24 h-12 rounded-full font-bold bg-purple-400 text-white shadow-sm hover:bg-purple-500 hover:shadow-md transition duration-200"
        onClick={() => getpokemon("dark")}
      >DARK</button>
      <button
        className="w-24 h-12 rounded-full font-bold bg-pink-400 text-white shadow-sm hover:bg-pink-500 hover:shadow-md transition duration-200"
        onClick={() => getpokemon("fairy")}
      >FAIRY</button>
      <button
        className="w-24 h-12 rounded-full font-bold bg-gray-400 text-white shadow-sm hover:bg-gray-500 hover:shadow-md transition duration-200"
        onClick={() => getpokemon("rock")}
      >ROCK</button>
      <input
          placeholder="Type"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getpokemon(e.target.value)
          }
        }}
    className="w-32 h-12 px-5 rounded-full bg-white border border-gray-300 outline-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
  />
  <div className='relative w-32'>
  <select value={generation} name='Generation'
  onChange={(e)=>{
    setGeneration(e.target.value)
  }}
  className="w-32 h-12 px-3 appearance-none rounded-full bg-white border border-gray-300 outline-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200">
    <option value="" disabled>Genration</option>
    <option value="1">Generation I — Kanto</option>
    <option value="2">Generation II — Johto</option>
    <option value="3">Generation III — Hoenn</option>
    <option value="4">Generation IV — Sinnoh</option>
    <option value="5">Generation V — Unova</option>
    <option value="6">Generation VI — Kalos</option>
    <option value="7">Generation VII — Alola</option>
    <option value="8">Generation VIII — Galar</option>
    <option value="9">Generation IX — Paldea</option>
  </select>
  {!generation &&
  <ChevronDown strokeWidth={1} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  }
  </div>
</div>
  )
}
