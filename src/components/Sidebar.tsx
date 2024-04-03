import { useState, useEffect } from "react";
import pokeApi from "../service/pokeApi";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  setSelectedTypes: (cb: (state: string[]) => string[]) => void;
  setSelectedGenerations: (cb: (state: string[]) => string[]) => void;
  setSelectedColors: (cb: (state: string[]) => string[]) => void;
};

// Type
type Filter = {
  name: string;
};
type FilterData = {
  results: Array<Filter>;
};

const Sidebar: React.FC<Props> = ({
  search,
  setSearch,
  setSelectedTypes,
  setSelectedGenerations,
  setSelectedColors,
}) => {
  const [generation, setGeneration] = useState<Array<Filter>>([]);
  const [type, setType] = useState<Array<Filter>>([]);
  const [color, setColor] = useState<Array<Filter>>([]);

  // State for toggle filters
  const [isOpenGeneration, setIsOpenGeneration] = useState<Boolean>(false);
  const [isOpenType, setIsOpenType] = useState<Boolean>(false);
  const [isOpenColor, setIsOpenColor] = useState<Boolean>(false);

  // Search filter
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  // Generation filter
  const handleGenerationFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.value;
    if (isChecked) {
      setSelectedGenerations((currentGenerations) => {
        return [...currentGenerations, value];
      });
    } else {
      setSelectedGenerations((currentGenerations) => {
        return currentGenerations.filter((generation) => generation !== value);
      });
    }
  };

  // Type filter
  const handleTypeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.value;
    if (isChecked) {
      setSelectedTypes((currentTypes) => {
        return [...currentTypes, value];
      });
    } else {
      setSelectedTypes((currentTypes) => {
        return currentTypes.filter((type) => type !== value);
      });
    }
  };

  // Color filter
  const handleColorFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.value;
    if (isChecked) {
      setSelectedColors((current) => {
        return [...current, value];
      });
    } else {
      setSelectedColors((current) => {
        return current.filter((col) => col !== value);
      });
    }
  };

  // Retrieve filters from PokeAPI ----------

  // Retrieve generation filters
  async function fetchGenerationFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/generation");
      const result = data.results.slice(0, 3);
      setGeneration(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGenerationFilters();
  }, []);

  const pokeGeneration = generation.map((gen, index) => (
    <div className="flex gap-2" key={index}>
      <input
        type="checkbox"
        name={`generation/${index + 1}`}
        id={`generation/${index + 1}`}
        value={gen.name.split("-")[1]}
        onChange={handleGenerationFilter}
        className="cursor-pointer"
      />
      <label htmlFor={`generation/${index + 1}`}>
        {`${gen.name.slice(0, 1).toUpperCase()}${gen.name.slice(
          1,
          10
        )} ${gen.name.slice(11).toUpperCase()}`}
      </label>
    </div>
  ));

  // Retrieve type filters
  async function fetchTypeFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/type");
      const result = data.results;
      result.sort((a, b) => a.name.localeCompare(b.name));
      setType(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTypeFilters();
  }, []);

  const pokeType = type.map((typ, index) => (
    <div className="flex gap-2" key={index}>
      <input
        type="checkbox"
        name={`type/${index + 1}`}
        id={`type/${index + 1}`}
        value={typ.name}
        onChange={handleTypeFilter}
        className="cursor-pointer"
      />
      <label htmlFor={`type/${index + 1}`}>
        {typ.name.slice(0, 1).toUpperCase() + typ.name.slice(1)}
      </label>
    </div>
  ));

  // Retrieve color filters
  async function fetchColorFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/pokemon-color");
      const result = data.results;
      setColor(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchColorFilters();
  }, []);

  const pokeColor = color.map((col, index) => (
    <div className="flex gap-2" key={index}>
      <input
        type="checkbox"
        name={`color/${index + 1}`}
        id={`color/${index + 1}`}
        value={col.name}
        onChange={handleColorFilter}
        className="cursor-pointer"
      />
      <label htmlFor={`color/${index + 1}`}>
        {col.name.slice(0, 1).toUpperCase() + col.name.slice(1)}
      </label>
    </div>
  ));

  // Component
  return (
    <div
      className="w-64 bg-blue-200 flex flex-col gap-5 p-2 overflow-y-scroll overflow-x-hidden"
      style={{ height: "calc(100vh - 99px)" }}
    >
      <div className="searchbar">
        <h1 className="text-lg font-bold">Search Pokemon</h1>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            className="p-2 rounded-lg bg-blue-50"
            value={search}
            onChange={handleSearch}
          ></input>
        </label>
      </div>

      <div className="generation flex flex-col px-2">
        <button
          className="font-bold text-left flex justify-between"
          onClick={() => setIsOpenGeneration((prev) => !prev)}
        >
          {isOpenGeneration ? (
            <div>
              <p>Generation ▲</p>
            </div>
          ) : (
            <div>
              <p>Generation ▼</p>
            </div>
          )}
        </button>
        {isOpenGeneration ? pokeGeneration : null}
      </div>

      <div className="type flex flex-col px-2">
        <button
          className="font-bold text-left  flex justify-between"
          onClick={() => setIsOpenType((prev) => !prev)}
        >
          {isOpenType ? (
            <div>
              <p>Type ▲</p>
            </div>
          ) : (
            <div>
              <p>Type ▼</p>
            </div>
          )}
        </button>
        {isOpenType ? pokeType : null}
      </div>

      <div className="color flex flex-col px-2">
        <button
          className="font-bold text-left flex justify-between"
          onClick={() => setIsOpenColor((prev) => !prev)}
        >
          {isOpenColor ? (
            <div>
              <p>Color ▲</p>
            </div>
          ) : (
            <div>
              <p>Color ▼</p>
            </div>
          )}
        </button>
        {isOpenColor ? pokeColor : null}
      </div>
    </div>
  );
};

export default Sidebar;
