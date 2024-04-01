import { createContext, useState, useEffect } from "react";

export const PokeContext = createContext();

// declare team type

type pokeTeam = {
  id: number;
  name: string;
  archived: boolean;
  members: Array<number>;
};

function PokeContextWrapper({ children }) {
  // if team already exists, we keep it even if page is refreshed
  let initialTeam: Array<number>;
  if (localStorage.getItem("currPokeTeam")) {
    const history = localStorage.getItem("currPokeTeam");
    initialTeam = JSON.parse(history);
  } else {
    initialTeam = [];
  }

  // state to see whether current pokemon team is shiny or not
  let initShiny: boolean;
  if (localStorage.getItem("IsShiny")) {
    const history = localStorage.getItem("IsShiny");
    initShiny = JSON.parse(history);
  } else {
    initShiny = false;
  }

  const [currTeam, setCurrTeam] = useState<Array<number>>(initialTeam);
  const [teamFull, setTeamFull] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  // update whether current team is full ornot
  useEffect(() => {
    if (currTeam.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    if (currTeam.length > 5) {
      setTeamFull(true);
    } else {
      setTeamFull(false);
    }
  }, [currTeam]);

  // is shiny
  const [isShiny, setIsShiny] = useState<boolean>(initShiny);

  function makeItShiny() {
    if (isShiny) {
      setIsShiny(false);
    } else {
      setIsShiny(true);
    }
  }

  // update local storage to store the current team and team status every time it is changed
  useEffect(() => {
    localStorage.setItem("currPokeTeam", JSON.stringify(currTeam));
  }, [currTeam]);

  useEffect(() => {
    localStorage.setItem("TeamFull", JSON.stringify(teamFull));
  }, [teamFull]);

  useEffect(() => {
    localStorage.setItem("IsEmpty", JSON.stringify(isEmpty));
  }, [isEmpty]);

  useEffect(() => {
    localStorage.setItem("IsShiny", JSON.stringify(isShiny));
  }, [isShiny]);

  // state to know whether the "current" team on the teams page is a new team or an already created team
  const [teamToEdit, setTeamToEdit] = useState<pokeTeam | null>(null);

  // function to add a pokemon to the team

  function addTeamMemb(id: number) {
    if (currTeam.length > 5) {
      setTeamFull(true);
      return 1;
    }
    setCurrTeam([...currTeam, id]);
    return 1;
  }

  // function to remove a pokefrom from the team

  function removeTeamMemb(index: number) {
    const copy = [...currTeam];
    copy.splice(index, 1);
    setCurrTeam(copy);
  }

  // state for showing the pokemon list
  const [pokeList, setPokeList] = useState(null);
  return (
    <PokeContext.Provider
      value={{
        currTeam,
        setCurrTeam,
        teamFull,
        setTeamFull,
        isEmpty,
        setIsEmpty,
        addTeamMemb,
        removeTeamMemb,
        isShiny,
        setIsShiny,
        makeItShiny,
        teamToEdit,
        setTeamToEdit,
        pokeList,
        setPokeList,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}

export default PokeContextWrapper;
