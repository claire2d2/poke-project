import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendApi from "../service/backendApi";
import Sidebar from "../components/Sidebar";
import PokeCard from "../components/PokeCard";
import FaveButton from "../components/FaveButton";
import Dropdown from "../components/Filters/Dropdown";

// Types
type favorite = {
  pokemonId: number;
  id: number;
};

type PokeObject = {
  id: number;
  name: string;
  image: string;
  type: string[];
  generation: string;
  color: string;
  height: number;
  weight: number;
  favorite: favorite[];
  url: string;
};

// Debounced for search bar
const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

// Component
const AllPokemon = () => {
  const [pokemon, setPokemon] = useState<Array<PokeObject>>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const [favoritePokemonIds, setFavoritePokemonIds] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortByAsc, setSortByAsc] = useState<boolean>(true);

  // Fetch Pokemon data
  const fetchFilteredPokemon = async () => {
    try {
      const { data } = await backendApi.get(
        `/pokemons?_embed=favorite&name_like=${debouncedSearch}`
      );
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilteredPokemon();
  }, [debouncedSearch]);

  // Sort by name/height/weight
  const sortPokemon = () => {
    const sortedPokemon = [...pokemon].sort((a, b) => {
      if (sortBy === "name") {
        return sortByAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "height") {
        return sortByAsc ? a.height - b.height : b.height - a.height;
      } else if (sortBy === "weight") {
        return sortByAsc ? a.weight - b.weight : b.weight - a.weight;
      }
      return 0;
    });
    setPokemon(sortedPokemon);
  };

  useEffect(() => {
    sortPokemon();
  }, [sortBy, sortByAsc]);

  // Fetch favorite Pokemon IDs
  const fetchFavoritePokemonIds = async () => {
    try {
      const { data } = await backendApi.get("/favorite");
      setFavoritePokemonIds(data.map((favorite: any) => favorite.pokemonId));
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by favorites
  const filterByFavorites = () => {
    if (showFavorites) {
      fetchFilteredPokemon();
    } else {
      const favoritePokemon = pokemon.filter((onePoke) =>
        favoritePokemonIds.includes(onePoke.id)
      );
      setPokemon(favoritePokemon);
    }
    setShowFavorites(!showFavorites);
  };

  useEffect(() => {
    fetchFavoritePokemonIds();
  }, []);

  // Display filters on front-end
  let displayedPoke;

  if (
    selectedTypes.length ||
    selectedGenerations.length ||
    selectedColors.length
  ) {
    displayedPoke = pokemon.filter((onePoke) => {
      const typeMatch =
        selectedTypes.length === 0 ||
        onePoke.type.some((type) => selectedTypes.includes(type));
      const generationMatch =
        selectedGenerations.length === 0 ||
        selectedGenerations.includes(onePoke.generation);
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(onePoke.color);

      return typeMatch && generationMatch && colorMatch;
    });
  } else {
    displayedPoke = pokemon;
  }

  let total = displayedPoke.length;

  return (
    <div className="flex">
      <Sidebar
        search={search}
        setSearch={setSearch}
        setSelectedTypes={setSelectedTypes}
        setSelectedGenerations={setSelectedGenerations}
        setSelectedColors={setSelectedColors}
      />
      <div
        className="flex flex-col gap-2 p-2 w-full overflow-y-scroll"
        style={{ height: "calc(100vh - 99px)" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <Dropdown
              options={[
                {
                  value: "",
                  label: "Sort by",
                  disabled: true,
                },
                { value: "nameAsc", label: "Name asc" },
                { value: "nameDesc", label: "Name desc" },
                { value: "heightAsc", label: "Height asc" },
                { value: "heightDesc", label: "Height desc" },
                { value: "weightAsc", label: "Weight asc" },
                { value: "weightDesc", label: "Weight desc" },
              ]}
              onSelect={(value) => {
                if (value === "nameAsc" || value === "nameDesc") {
                  setSortBy("name");
                  setSortByAsc(value === "nameAsc");
                  sortPokemon();
                } else if (value === "heightAsc" || value === "heightDesc") {
                  setSortBy("height");
                  setSortByAsc(value === "heightAsc");
                } else if (value === "weightAsc" || value === "weightDesc") {
                  setSortBy("weight");
                  setSortByAsc(value === "weightAsc");
                } else {
                  setSortBy("");
                }
              }}
              defaultValue=""
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={filterByFavorites}
              className="transition-all bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full sticky  font-press-start text-xs"
            >
              {showFavorites ? "Show all" : "Show favorites"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 grid-flow-row gap-2">
          {displayedPoke.map((onePoke) => (
            <div
              key={onePoke.id}
              className="flex flex-col items-center gap-1 border rounded shadow hover:shadow-md transition-all"
            >
              <Link to={`/pokemon/${onePoke.id}`}>
                <div className="flex flex-col w-auto justify-center items-center">
                  <PokeCard pokeData={onePoke} />
                </div>
              </Link>
              <div>
                <FaveButton
                  isFave={onePoke.favorite.length === 0 ? false : true}
                  currPoke={onePoke}
                  heartSize={2}
                />
              </div>
            </div>
          ))}
        </div>
        <p>Displayed Pokemon: {total}</p>
      </div>
    </div>
  );
};

export default AllPokemon;
