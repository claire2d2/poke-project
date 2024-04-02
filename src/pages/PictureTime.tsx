import { useState, useEffect } from "react";

import Instruction from "../components/PicturePage/Instruction";
import backendApi from "../service/backendApi";

import ShowChosenTeam from "../components/PicturePage/ShowChosenTeam";
import FinalPicture from "../components/PicturePage/FinalPicture";

import mistyImg from "../assets/Misty.png";
import ashImg from "../assets/Ash_Ketchum.png";
import backgroundImg from "../assets/backgrountest.jpg";

type pokeTeam = {
  name: string;
  isShiny: boolean;
  members: Array<number>;
  id: number;
};

const PictureTime = () => {
  const [teamList, setTeamList] = useState<Array<pokeTeam>>([]);
  const [chosenTeam, setChosenTeam] = useState<number>(0);
  // get the team names, and team members from the backend API
  async function fetchTeams() {
    try {
      const response = await backendApi.get<Array<pokeTeam>>("/teams");
      setTeamList(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTeams();
  }, []);

  // listen to which team is being selected
  const handleTeamChange = (e) => {
    setChosenTeam(e.currentTarget.value);
    console.log(chosenTeam);
  };

  //style
  const trainerStyle =
    "h-full w-1/2 p-1 mx-3 rounded-lg bg-blue-200 flex flex-col items-center justify-center";
  const trainerHover = "hover:border-2 hover:border-blue-200 hover:scale-105";
  const trainerTitle = "my-1 font-bold font-xl";

  if (!teamList) {
    return <div>Nope!</div>;
  }
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-center text-5xl my-3 text-yellow-500 font-bold">
        It's pikature time!
      </h1>
      <div className="flex h-3/4 w-full my-5  gap-4 justify-center px-10 text-center">
        <Instruction stepName="1. Choose your trainer">
          <div className="flex m-5 h-3/4 justify-center gap-3">
            <button className={`${trainerStyle} ${trainerHover}`}>
              <img src={ashImg} alt="" className="h-3/4 object-contain" />
              <h4 className={trainerTitle}>Ash</h4>
            </button>
            <button className={`${trainerStyle} ${trainerHover}`}>
              <img src={mistyImg} alt="" className="h-3/4 object-contain" />
              <h4 className={trainerTitle}>Misty</h4>
            </button>
          </div>
          <p>You chose Misty!</p>
        </Instruction>
        <Instruction stepName="2. Choose your team">
          <div>
            {!teamList ? (
              "There are no teams at the moment ..."
            ) : (
              <select id="teamChange" onChange={handleTeamChange}>
                <option value={0}>Choose a team...</option>
                {teamList.map((team) => {
                  return (
                    <option className="capitalize" value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          {chosenTeam}
          <ShowChosenTeam pokeTeamId={chosenTeam} teamList={teamList} />
        </Instruction>
        <Instruction stepName="3. Choose your background">
          test test
        </Instruction>
      </div>
      <div className="w-full text-center"> Chheeeeeese!</div>
      <div>
        TEST
        <FinalPicture
          chosenTrainer={mistyImg}
          pokeTeamId={chosenTeam}
          chosenImg={backgroundImg}
        />
        {/* <div className="imageZone relative">
          <img src={backgroundImg} alt="" />
          <div className="absolute top-0 flex items-center">
            {teamList[0].members.map((member: number) => {
              return <SmallSprite pokeId={Number(member)} shinyState={true} />;
            })}
          </div> */}
        {/* </div>  */}
        <button>Take a picture</button>
      </div>
    </div>
  );
};

export default PictureTime;
