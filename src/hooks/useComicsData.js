import axios from "axios";
import md5 from "md5";
import { useContext } from "react";
import { ConfiguratorContext } from "../context";

const useComicsData = () => {
  const [state, setState] = useContext(ConfiguratorContext);

  //Getters
  const getComics = () => state.comics;
  const getSelectedComic = () => state.selectedComic;

  //setters
  const setSelectedComic = (id) => {
    let milliseconds = Number(new Date());
    let hash = md5(milliseconds + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
    let apiParameters = `ts=${milliseconds}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`;

    const getComic = () => axios.get(`${process.env.REACT_APP_API_URL}/comics/${id}?${apiParameters}`);
    const getCharacters = () => axios.get(`${process.env.REACT_APP_API_URL}/comics/${id}/characters?${apiParameters}`);
    const getStories = () => axios.get(`${process.env.REACT_APP_API_URL}/comics/${id}/stories?${apiParameters}`);

    Promise.all([getComic(), getCharacters(), getStories()]).then(response => {
      const comic = response[0].data.data.results[0];
      const characters = response[1].data.data.results;
      const stories = response[2].data.data.results;

      setState(prevState => {
        return {
          ...prevState,
          selectedComic: {
            ...prevState.selectedComic,
            id: id,
            info: comic,
            characters,
            stories,
          }
        }
      })
    }).catch(err => {
      setState(prevState => {
        return {
          ...prevState,
          selectedComic: null
        }
      })
    })
  }

  return {
    getComics,
    getSelectedComic,
    setSelectedComic
  }
}

export default useComicsData;
