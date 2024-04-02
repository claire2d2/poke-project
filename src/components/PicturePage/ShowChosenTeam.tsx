import React, { useState, useEffect } from "react";
import backendApi from "../../service/backendApi";

type pokeTeam = {
  name: string;
  isShiny: boolean;
  members: Array<number>;
  id: number;
};

const ShowChosenTeam: React.FC<{ pokeTeamId: number }> = ({
  pokeTeamId,
  teamList,
}) => {
  const [team, setTeam] = useState<pokeTeam | null>(null);

  async function fetchTeam() {
    try {
      const response = await backendApi.get(`/teams/${pokeTeamId}`);
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
    <div>
      <h1>{team.name}</h1>
    </div>
  );
};

export default ShowChosenTeam;
