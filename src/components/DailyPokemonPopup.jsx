
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function DailyPokemonPopup({ onClose }) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    const today = new Date()
    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const [year, month, day] = dateKey.split('-').map(Number)
    const dayNumber = Math.floor(
      Date.UTC(year, month - 1, day) / 86400000
    )
    const pokemonId = (dayNumber % 1025) + 1

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then(data => setPokemon(data))
      .catch(console.error)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-black"
          aria-label="Close popup"
        >
          &times;
        </button>

        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          Pokémon of the Day
        </p>

        {pokemon ? (
          <>
            <p className="mt-3 text-sm font-semibold text-gray-400">
              #{String(pokemon.id).padStart(4, '0')}
            </p>

            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, '0')}.png`}
              alt={pokemon.name}
              className="mx-auto h-48 w-48 object-contain"
            />
            <h2 className="text-3xl font-bold capitalize text-gray-800">
              {pokemon.name}
            </h2>

            <div className="mt-3 flex justify-center gap-2">
              {pokemon.types.map(item => (
                <span
                  key={item.type.name}
                  className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold capitalize text-blue-700"
                >
                  {item.type.name}
                </span>
              ))}
            </div>

            <Link
              to={`/details/${pokemon.name}`}
              onClick={onClose}
              className="mt-6 block rounded-full bg-red-500 px-5 py-3 font-bold text-white hover:bg-red-600"
            >
              Explore Pokémon
            </Link>
          </>
        ) : (
          <p className="py-12 text-gray-500">Loading Pokémon...</p>
        )}

        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-500 hover:text-gray-800"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}