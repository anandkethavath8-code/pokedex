import { useState } from 'react'
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const [search,setSearch]=useState("")
    const navigate =useNavigate()
    const handleSearch = () => {
        if (search.trim() === "") return
        navigate(`/pokemon?search=${search.toLowerCase().trim()}`)
    }
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/4e/5b/2b/4e5b2becd9a6176dd6406ea7320bcfd4.jpg')"
      }}
    >
      <div className="min-h-screen bg-black/30">
         <Navbar/>
        <div className="px-5 md:px-10 pt-20 md:pt-32">
          <h1 className="text-5xl font-bold text-white">
            Discover Your
          </h1>

          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Favourite Pokémon
          </h1>

          <p className="mt-4 md:mt-6 text-base md:text-lg text-white max-w-xl">
            Explore, search and learn about all 1,000+ Pokémon
            from the amazing world of Pokémon!
          </p>
          <div className='mt-8 md:mt-10 w-full max-w-250'>
            <input type="text" placeholder='Search Pokemon by name or number'
            className='w-full h-15 rounded-full pl-10 bg-white/90 outline-none' 
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                     handleSearch()
                }
            }}
            />
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}