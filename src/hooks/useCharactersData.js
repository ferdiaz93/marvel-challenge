import axios from "axios";
import md5 from "md5";
import { useContext } from "react";
import { ConfiguratorContext } from "../context";

const useCharactersData = () => {
  const [state, setState] = useContext(ConfiguratorContext);

  //Getters
  const getCharacters = () => state.characters;
  const getSelectedCharacter = () => state.selectedCharacter;

  //setters
  const setSelectedCharacter = (id) => {
    let milliseconds = Number(new Date());
    let hash = md5(milliseconds + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
    let apiParameters = `ts=${milliseconds}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`;

    const getCharacter = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}?${apiParameters}`);
    const getComics = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}/comics?${apiParameters}`);
    const getStories = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}/stories?${apiParameters}`);
    const getSeries = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}/series?${apiParameters}`);

    Promise.all([getCharacter(), getComics(), getStories(), getSeries()]).then(response => {
      const character = response[0].data.data.results[0];
      const comics = response[1].data.data.results;
      const stories = response[2].data.data.results;
      const series = response[3].data.data.results;

      setState(prevState => {
        return {
          ...prevState,
          selectedCharacter: {
            ...prevState.selectedCharacter,
            id: id,
            info: character,
            comics,
            stories,
            series
          }
        }
      })
    })
  }

  return {
    getCharacters,
    getSelectedCharacter,
    setSelectedCharacter
  }
}

export default useCharactersData;
