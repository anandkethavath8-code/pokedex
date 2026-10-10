import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { Search,Swords } from "lucide-react";
import Pokemoncards from "../components/pokemoncards";
import vsimage from '../../assets/image.png'

export default function Pokemonfight() {
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [pokemon1, setPokemon1] = useState([]);
  const [pokemon2, setPokemon2] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions1, setShowSuggestions1] = useState(true);
  const [showSuggestions2, setShowSuggestions2] = useState(true);
  const [winner, setWinner] = useState(null);

  const handler1 = () => {
    if (search1.trim() === "") return;
    const name = search1.toLowerCase().trim();

    fetch(`https://pokeapi.co/api/v2/pokemon/${search1}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("pokemon not found");
        }
        return response.json();
      })
      .then(() => {
        setPokemon1([name]);
        setWinner(null);
      })
      .catch(() => {
        alert("pokemon not found");
      });
  };

  const handler2 = () => {
    if (search2.trim() === "") return;
    const name = search2.toLowerCase().trim();

    fetch(`https://pokeapi.co/api/v2/pokemon/${search2}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("pokemon not found");
        }
        return response.json();
      })
      .then(() => {
        setPokemon2([name]);
        setWinner(null);
      })
      .catch(() => {
        alert("pokemon not found");
      });
  };

const getwinner = async () => {
  try {
    const res1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon1[0]}`
    );
    const res2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon2[0]}`
    );

    const data1 = await res1.json();
    const data2 = await res2.json();

    const total1 = data1.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );

    const total2 = data2.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );

    if (total1 > total2) {
      setWinner({
        name: data1.name,
        total: total1,
        loser: data2.name,
        loserTotal: total2,
      });
    } else if (total2 > total1) {
      setWinner({
        name: data2.name,
        total: total2,
        loser: data1.name,
        loserTotal: total1,
      });
    } else {
      setWinner({
        name: null,
        total: total1,
        loser: null,
        loserTotal: total2,
      });
    }
  } catch (error) {
    alert("Could not compare Pokémon. Please try again.");
  }
}

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
      .then((res) => res.json())
      .then((data) => setSuggestions(data.results.map((item) => item.name)));
  }, []);

  return (
    <div className="w-full h-200 relative flex flex-col">
      <Navbar />
      <div className="px-2 py-3 mt-5 flex flex-col items-center text-center">
      <div className="flex items-center gap-3 justify-center">
        <Swords
          size={34}
          className="text-blue-900"
          strokeWidth={3}
        />

        <h1 className="text-2xl font-bold text-blue-950">
          Pokémon Fight
        </h1>
      </div>

      <p className="mt-1 text-sm text-slate-600">
        Choose two Pokémon and see who wins!
      </p>
    </div>
      <div className={`h-150 ml-25 mt-30 absolute flex ${
  pokemon1.length > 0 && pokemon2.length > 0 ? "gap-0" : "gap-50"
}`}>
        <div className=" w-130 h-fit mt-10 ml-10 p-3">
          <div className="relative w-full">
            <Search
              strokeWidth={1}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              type="text"
              value={search1}
              placeholder="Search Pokemon by name or number"
              className="w-full h-13 rounded-full pl-12 bg-white/90 shadow-md"
              onChange={(e) => {
                setSearch1(e.target.value);
                setShowSuggestions1(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handler1();
                }
              }}
            />

            {search1.trim() && showSuggestions1 && (
              <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl bg-white shadow-lg overflow-hidden">
                {suggestions
                  .filter((name) =>
                    name.startsWith(search1.toLowerCase().trim()),
                  )
                  .slice(0, 5)
                  .map((name) => (
                    <button
                      key={name}
                      className="block w-full px-5 py-3 text-left capitalize hover:bg-gray-100"
                      onClick={() => {
                        setSearch1(name);
                        setPokemon1([name]);
                        setShowSuggestions1(false);
                        setWinner(null);
                      }}
                    >
                      {name}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center">
            {pokemon1.map((item) => (
              <div
                key={item}
                className="w-45 md:w-50 h-66 p-3 shadow-2xl rounded-xl bg-white/90"
              >
                <Pokemoncards pokemon={item} />
              </div>
            ))}
          </div>
        </div>
        {
          pokemon1.length>0 && pokemon2.length>0 &&(
            <div className=" w-50 h-91 mt-10 p-3 mx-auto">
  <div className="flex justify-center">
    <img
      src={vsimage}
      alt="VS"
      className="w-full h-100 h-16 object-contain"
    />
  </div>
        </div>
          )
        }
        <div className=" w-130 h-fit mt-10 p-3">
          <div className="relative w-full">
            <Search
              strokeWidth={1}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              type="text"
              value={search2}
              placeholder="Search Pokemon by name or number"
              className="w-full h-13 rounded-full pl-12 bg-white/90 shadow-md"
              onChange={(e) => {
                setSearch2(e.target.value);
                setShowSuggestions2(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handler2();
                }
              }}
            />

            {search2.trim() && showSuggestions2 && (
              <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl bg-white shadow-lg overflow-hidden">
                {suggestions
                  .filter((name) =>
                    name.startsWith(search2.toLowerCase().trim()),
                  )
                  .slice(0, 5)
                  .map((name) => (
                    <button
                      key={name}
                      className="block w-full px-5 py-3 text-left capitalize hover:bg-gray-100"
                      onClick={() => {
                        setSearch2(name);
                        setPokemon2([name]);
                        setShowSuggestions2(false);
                        setWinner(null);
                      }}
                    >
                      {name}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center">
            {pokemon2.map((item) => (
              <div
                key={item}
                className="w-45 md:w-50 h-66 p-3 shadow-2xl rounded-xl bg-white/90"
              >
                <Pokemoncards pokemon={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
   
{
  pokemon1.length > 0 && pokemon2.length > 0 && (
    <>
      <div className=" h-15 w-full mt-88 relative z-10 flex items-center justify-center">
        <button
          className="bg-white text-black p-3 w-30 rounded"
          onClick={getwinner}
        >
          Fight
        </button>
      </div>

      {winner && (
        <div className="mt-5 mx-auto w-fit rounded-xl bg-white p-6 text-center shadow-xl">
          {winner.name ? (
            <>
              <h2 className="text-2xl font-bold text-green-600">
                🏆 {winner.name.toUpperCase()} WINS!
              </h2>

              <p className="mt-2">
                Total base stats: {winner.total}
              </p>

              <p className="mt-1 text-gray-600">
                {winner.loser} — {winner.loserTotal} stats
              </p>
            </>
          ) : (
            <h2 className="text-xl font-bold">
              🤝 It's a tie! Both Pokémon have {winner.total} total base stats.
            </h2>
          )}
        </div>
      )}
    </>
  )
}
    </div>
  );
}
