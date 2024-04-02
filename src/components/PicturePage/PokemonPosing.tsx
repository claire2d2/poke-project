import backendApi from "../../service/backendApi";
import { useState, useEffect } from "react";

type PokeObject = {
  id: number;
  name: string;
  image: string;
  type: string[];
};

const PokemonPosing = ({ pokeId }) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  async function fetchPokeImage() {
    try {
      const response = await backendApi(`/pokemons/${pokeId}`);
      setImgUrl(response.data.image);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeImage();
  }, [pokeId]);
  return (
    <div className="">
      <img src={imgUrl} alt="" />
    </div>
  );
};

export default PokemonPosing;
