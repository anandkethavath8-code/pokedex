import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import Pokemon from './pages/pokemon';
import Details from './pages/details';
import Invalidpage from './pages/invalidpage';
import { useEffect, useState } from 'react'
import Evochain from "./pages/evochain";

function App() {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  )

  useEffect(()=>{
    localStorage.setItem("favourites",JSON.stringify(favourites))
  },[favourites])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Favourite" element={<Favourite favourites={favourites} setFavourites={setFavourites}/>}/>
      <Route path="/pokemon" element={<Pokemon favourites={favourites} setFavourites={setFavourites}/>}/>
      <Route path='/details/:name' element={<Details/>} />
      <Route path='*' element={<Invalidpage/>} />
      <Route path="/evolist/:name" element={<Evochain favourites={favourites} setFavourites={setFavourites}/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
