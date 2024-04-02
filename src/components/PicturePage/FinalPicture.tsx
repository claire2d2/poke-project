import { useState, useEffect } from "react";

import backendApi from "../../service/backendApi";
import PokemonPosing from "./PokemonPosing";

type pokeTeam = {
  name: string;
  isShiny: boolean;
  members: Array<number>;
  id: number;
};

const FinalPicture: React.FC<{
  chosenTrainer: string;
  pokeTeamId: number;
  chosenImg: string;
}> = ({ chosenTrainer, pokeTeamId, chosenImg }) => {
  const [team, setTeam] = useState<pokeTeam | null>(null);

  async function fetchTeam() {
    try {
      const response = await backendApi.get<pokeTeam>(`/teams/${pokeTeamId}`);
      setTeam(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeam();
  }, [pokeTeamId]);
  if (pokeTeamId === 0) {
    return <div>No team yet</div>;
  }
  return (
    <div className="relative bg-gray-200 overflow-hidden">
      <img
        src={chosenImg}
        alt="background image"
        className="object-cover h-full"
      />

      <div className="Team absolute top-0 -left-20 w-full scale-50">
        <div className="absolute top-20 -left-20">
          <PokemonPosing pokeId={team?.members[0]} />
        </div>
        <div className="absolute top-20 -left-20">
          <PokemonPosing pokeId={team?.members[1]} />
        </div>
        <div className="absolute top-20 -left-0">
          <PokemonPosing pokeId={team?.members[2]} />
        </div>
        <div className="absolute top-20 left-20">
          <PokemonPosing pokeId={team?.members[3]} />
        </div>
        <div className="absolute top-20 left-40">
          <PokemonPosing pokeId={team?.members[4]} />
        </div>
        <div className="absolute top-20 left-60">
          <PokemonPosing pokeId={team?.members[5]} />
        </div>
      </div>
      <div className="trainer">
        <img
          src={chosenTrainer}
          alt="trainer"
          className="absolute -bottom-60 -left-20 scale-150"
        />
      </div>
    </div>
  );
};

export default FinalPicture;
