import { useState, useEffect } from "react";
import backendApi from "../service/backendApi";

type PokeObject = {
  id: number;
  name: string;
  favorite: Array<pokeFave> | null;
};

type pokeFave = { pokemonId: number; id: number };

const FaveButton: React.FC<{
  isFave: boolean;
  currPoke: PokeObject | null;
  heartSize: number;
}> = ({ isFave, currPoke, heartSize }) => {
  const [faveState, setFaveState] = useState<boolean>(false);

  useEffect(() => {
    setFaveState(isFave);
  }, [isFave]);

  const handleFavorite = (
    e: React.MouseEvent<HTMLElement>,
    faveState: boolean,
    currPoke: PokeObject | null
  ) => {
    e.preventDefault();
    if (currPoke) {
      if (!faveState) {
        makeFavorite(currPoke.id);
        setFaveState(true);
      } else {
        deleteFavorite(currPoke);
        setFaveState(false);
      }
    }
  };

  async function makeFavorite(currPokeId: number) {
    try {
      await backendApi.post(`/favorite`, {
        pokemonId: currPokeId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavorite(currPoke: PokeObject) {
    try {
      // Find the index of the favorite object with the matching pokemonId
      if (currPoke.favorite) {
        const idToDelete: number = currPoke?.favorite[0].id;
        // Make delete request to delete the favorite
        const response = await backendApi.delete(`/favorite/${idToDelete}`);
        console.log("I have deleted a fave");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const faveEmoji = "❤️";
  const unFaveEmoji = "🤍";
  return (
    <div className="Favorite flex">
      <button
        onClick={(e) => handleFavorite(e, faveState, currPoke)}
        className={`text-${heartSize}xl flex`}
      >
        {faveState ? faveEmoji : unFaveEmoji}
      </button>
    </div>
  );
};
export default FaveButton;
