import { useState, useEffect, useRef } from "react";
import backendApi from "../../service/backendApi";

// import team components
import SmallSprite from "./SmallSprite";
import editIcon from "../../assets/edit_team.png";
import DeleteTeamModal from "./DeleteTeamModal";

// import global state and types
import useTeam from "../../context/usePoke";
import { pokeTeam } from "../TeamData";
import { fetchTeams } from "../TeamData";
import { fetchOneTeam } from "../TeamData";

const TeamsList = () => {
  const { currTeam, setCurrTeam, teamToEdit, setTeamToEdit, deleteCheck } =
    useTeam();
  const [teamList, setTeamList] = useState<pokeTeam[] | null>([]);

  // use state to determine which is the current team to delete
  const [teamToDel, setTeamToDel] = useState<number | null>(null);

  // get the team names, and team members from the backend API

  useEffect(() => {
    fetchTeams(setTeamList);
  }, [currTeam]);

  // handle editing a team
  const handleEdit = (id: number) => {
    fetchOneTeam(id, setTeamToEdit);
  };

  useEffect(() => {
    if (teamToEdit) {
      setCurrTeam(teamToEdit.members);
    }
  }, [teamToEdit]);

  // delete teams when clicking on delete button
  async function deleteTeam(id: number | null) {
    try {
      const response = await backendApi.delete<Array<pokeTeam>>(`/teams/${id}`);
      console.log(response);
      fetchTeams(setTeamList);
      closeDeleteModal(id);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (id: number | null) => {
    if (deleteCheck) {
      setTeamToDel(id);
      deleteTeam(id);
      return;
    }
    openDeleteModal(id);
  };

  // dialog to confirm that user does want to delete a team
  const deleteModals = useRef<(HTMLDialogElement | null)[]>([]);

  // dialog to confirm that user does want to delete a team
  function openDeleteModal(id: number | null) {
    if (id !== null && deleteModals.current[id]) {
      deleteModals.current[id]?.showModal();
    }
  }

  function closeDeleteModal(id: number | null) {
    if (id !== null && deleteModals.current[id]) {
      deleteModals.current[id]?.close();
    }
  }

  return (
    <div className="h-full overflow-auto no-scrollbar pb-16 px-5">
      {teamList?.length === 0
        ? "No teams at the moment..."
        : teamList?.map((team) => {
            return (
              <div className="px-5" key={team.id}>
                <h3 className="font-bold capitalize text-blue-800 dark:text-stone-300 my-1 drop-shadow-sm">
                  {team.name} :
                </h3>
                <div
                  className={`relative flex py-2 items-center group bg-white rounded-xl hover:bg-orange-100 dark:bg-slate-500 dark:hover:bg-slate-400 shadow-md ${
                    team.id === teamToEdit?.id
                      ? "bg-cyan-500 hover:bg-cyan-500"
                      : ""
                  } `}
                >
                  {/* button to delete team if possible, only visible when hovering on the team */}
                  <button
                    onClick={() => handleDelete(team.id)}
                    className={`absolute m-0 top-0 right-3 text-gray-500 font-bold hidden group-hover:inline hover:text-red-500`}
                  >
                    x
                  </button>
                  <div
                    className={`flex items-center ${
                      team.id === teamToEdit?.id ? "scale-105" : ""
                    }`}
                  >
                    {team.members.map((member: number) => {
                      return (
                        <SmallSprite
                          pokeId={Number(member)}
                          shinyState={team.isShiny}
                        />
                      );
                    })}
                  </div>
                  {/* edit button */}
                  <button
                    onClick={() => handleEdit(team.id)}
                    className="scale-50 bg-gray-500 hover:bg-orange-500 p-1 rounded-lg transition-all"
                  >
                    <img src={editIcon} className="p-1" />
                  </button>
                  {/* //! dialog when trying to delete team here */}
                  <dialog
                    key={team.id}
                    id={`delete-modal-${team.id}`}
                    ref={(element) => {
                      deleteModals.current[team.id] = element; // Store ref in the array
                    }}
                    className="relative p-5 bg-red-50 shadow-md text-center"
                  >
                    <DeleteTeamModal
                      teamId={team.id}
                      teamToDel={teamToDel}
                      closeDeleteModal={() => closeDeleteModal(team.id)}
                      deleteTeam={() => deleteTeam(teamToDel)}
                    />
                  </dialog>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default TeamsList;
