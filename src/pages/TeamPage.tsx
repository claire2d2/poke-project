//import context
import useTeam from "../context/usePoke";

// import relevant components

import TeamMember from "../components/TeamPage/TeamMember";
import CreateTeam from "../components/TeamPage/CreateTeam";
import FindPoke from "../components/TeamPage/FindPoke";

type pokeMemb = {
  index: number;
  pokeIndex: number;
};

const TeamPage = () => {
  const { currTeam, setCurrTeam } = useTeam();

  const teamArray = [
    { index: 1, pokeIndex: currTeam[0] },
    { index: 2, pokeIndex: currTeam[1] },
    { index: 3, pokeIndex: currTeam[2] },
    { index: 4, pokeIndex: currTeam[3] },
    { index: 5, pokeIndex: currTeam[4] },
    { index: 6, pokeIndex: currTeam[5] },
  ];

  return (
    <div className="TeamPage flex h-full w-full items-stretch">
      <div className="FindPokemon hidden">
        <FindPoke />
      </div>
      <div className="TeamView overflow-scroll no-scrollbar h-full w-full md:basis-2/3 flex flex-col md:flex-row md:flex-wrap gap-4 items-center justify-around md:justify-center">
        {teamArray.map((poke: pokeMemb) => {
          return (
            <div key={poke.index} className="lg:basis-1/4 ">
              <TeamMember pokeId={poke.pokeIndex} teamIndex={poke.index} />
            </div>
          );
        })}
      </div>
      <div className="CreateTeam hidden md:basis-1/3 md:flex md:h-full">
        <CreateTeam />
      </div>
    </div>
  );
};

export default TeamPage;

//reuse the pokecard component and setting up logic in place so that
//all favorited pokemons are passed as props
//--> array for favorites that is limited to length 6?
