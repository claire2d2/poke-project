import { useState } from "react";
import GenerationFilter from "./Filters/GenerationFilter";
import ColorFilter from "./Filters/ColorFilter";
import TypeFilter from "./Filters/TypeFilter";

type Filter = {
  name: string;
};

type Props = {
  search: string;
  setSearch: (search: string) => void;
  setSelectedTypes: (cb: (state: string[]) => string[]) => void;
  setSelectedGenerations: (cb: (state: string[]) => string[]) => void;
  setSelectedColors: (cb: (state: string[]) => string[]) => void;
};

const Sidebar: React.FC<Props> = ({
  search,
  setSearch,
  setSelectedTypes,
  setSelectedGenerations,
  setSelectedColors,
}) => {
  const [generation, setGeneration] = useState<Filter[]>([]);
  const [type, setType] = useState<Filter[]>([]);
  const [color, setColor] = useState<Filter[]>([]);

  // State for toggle filters
  const [isOpenGeneration, setIsOpenGeneration] = useState<boolean>(false);
  const [isOpenType, setIsOpenType] = useState<boolean>(false);
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false);

  // Search filter
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  // Component
  return (
    <div
      className="md:w-64 bg-blue-200 flex flex-col gap-5 p-2 overflow-y-scroll overflow-hidden no-scrollbar dark:bg-slate-600 pb-16"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">Search Pokemon</h1>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            className="p-2 rounded-lg bg-blue-50 dark:bg-slate-500 w-full"
            value={search}
            onChange={handleSearch}
          ></input>
        </label>
      </div>

      <GenerationFilter
        generation={generation}
        setGeneration={setGeneration}
        isOpenGeneration={isOpenGeneration}
        setIsOpenGeneration={setIsOpenGeneration}
        setSelectedGenerations={setSelectedGenerations}
      />

      <ColorFilter
        color={color}
        setColor={setColor}
        isOpenColor={isOpenColor}
        setIsOpenColor={setIsOpenColor}
        setSelectedColors={setSelectedColors}
      />

      <TypeFilter
        type={type}
        setType={setType}
        isOpenType={isOpenType}
        setIsOpenType={setIsOpenType}
        setSelectedTypes={setSelectedTypes}
      />
    </div>
  );
};

export default Sidebar;
