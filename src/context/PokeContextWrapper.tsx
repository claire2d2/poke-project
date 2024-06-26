import { createContext, useState, useEffect, ReactNode } from "react";

// declare team type

type pokeTeam = {
  id: number;
  name: string;
  archived: boolean;
  isShiny: boolean;
  members: Array<number>;
};

type PokeContextType = {
  currTeam: number[];
  setCurrTeam: React.Dispatch<React.SetStateAction<Array<number>>>;
  teamFull: boolean;
  setTeamFull: React.Dispatch<React.SetStateAction<boolean>>;
  isEmpty: boolean;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  isShiny: boolean;
  setIsShiny: React.Dispatch<React.SetStateAction<boolean>>;
  teamToEdit: pokeTeam | null;
  setTeamToEdit: React.Dispatch<React.SetStateAction<pokeTeam | null>>;
  addTeamMemb: (id: number) => void;
  removeTeamMemb: (id: number) => void;
  makeItShiny: (isShiny: boolean) => void;
  deleteCheck: boolean;
  setDeleteCheck: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMute: (isMute: boolean) => void;
};

export const PokeContext = createContext<PokeContextType | null>(null);

function PokeContextWrapper({ children }: { children: ReactNode }) {
  // if team already exists, we keep it even if page is refreshed

  let initialTeam: Array<number> = [];
  if (localStorage.getItem("currPokeTeam")) {
    const history = localStorage.getItem("currPokeTeam");
    if (history !== null) {
      initialTeam = JSON.parse(history);
    }
  }

  // state to see whether current pokemon team is shiny or not
  let initShiny: boolean = false;
  if (localStorage.getItem("IsShiny")) {
    const history = localStorage.getItem("IsShiny");
    if (history !== null) {
      initShiny = JSON.parse(history);
    }
  }

  // if checkbox for delete modal has already been checked, set initial value to "true"

  let initialDeleteCheck = false;
  if (localStorage.getItem("deleteInfoChecked")) {
    const history = localStorage.getItem("deleteInfoChecked");
    if (history !== null) {
      initialDeleteCheck = JSON.parse(history);
    }
  }

  // if user has already muted sound, check info here

  let initialMute: boolean = true;

  if (localStorage.getItem("IsMuted")) {
    const history = localStorage.getItem("IsMuted");
    if (history !== null) {
      initialMute = JSON.parse(history);
    }
  }

  // states to check on the team status : useful for when adding pokemon to the team

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

  // state to know whether the delete modal has been checked or not

  const [deleteCheck, setDeleteCheck] = useState<boolean>(initialDeleteCheck);

  // state to know whether the user has muted the sound or not

  const [isMuted, setIsMuted] = useState<boolean>(initialMute);

  function toggleMute() {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
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

  useEffect(() => {
    localStorage.setItem("deleteInfoChecked", JSON.stringify(deleteCheck));
  }, [deleteCheck]);

  useEffect(() => {
    localStorage.setItem("IsMuted", JSON.stringify(isMuted));
  }, [isMuted]);

  // state to know whether the "current" team on the teams page is a new team or an already created team
  let initEdit: pokeTeam | null = null;

  if (localStorage.getItem("Editing")) {
    const history = localStorage.getItem("Editing");
    if (history !== null) {
      initEdit = JSON.parse(history);
    }
  }

  const [teamToEdit, setTeamToEdit] = useState<pokeTeam | null>(initEdit);

  useEffect(() => {
    localStorage.setItem("Editing", JSON.stringify(teamToEdit));
  }, [teamToEdit]);
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
        deleteCheck,
        setDeleteCheck,
        isMuted,
        setIsMuted,
        toggleMute,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}

export default PokeContextWrapper;
