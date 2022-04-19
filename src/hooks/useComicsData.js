import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConfiguratorContext } from "../context";
import { apiParameters } from "../utils";

const useComicsData = () => {
  const [state, setState] = useContext(ConfiguratorContext);
  const navigate = useNavigate();

  //Getters
  const getComics = () => state.comics;
  const getSelectedComic = () => state.selectedComic;
  const getFavoritesComics = () => JSON.parse(localStorage.getItem('favorites_comics'));
  
  //setters
  const setSelectedComic = (id) => {
    const getComic = () => axios.get(`${process.env.REACT_APP_API_URL}/comics/${id}?${apiParameters()}`);
    const getCharacters = () => axios.get(`${process.env.REACT_APP_API_URL}/comics/${id}/characters?${apiParameters()}`);
    const getStories = () => axios.get(`${process.env.REACT_APP_API_URL}/comics/${id}/stories?${apiParameters()}`);

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
      console.log(err);
      setState(prevState => {
        return {
          ...prevState,
          selectedComic: null
        }
      })
      navigate('/');
    })
  }

  const setComics = (inputValue) => {
    const getComics = () => axios.get(`${process.env.REACT_APP_API_URL}/comics?titleStartsWith=${inputValue}&${apiParameters()}`);
    getComics().then(response => {
      let comics = response.data.data.results;
      comics.forEach(comic => comic.type = "comic");
      setState((prevState)=> {
        return{
          ...prevState,
          comics: response.data.data.results
        }
      })
    })
    .catch(err => {
      setState(prevState => {
        return {
          ...prevState
        }
      })
    })
  }

  const setFavoritesComics = (comic) => {
    let favoritesSaved = JSON.parse(localStorage.getItem('favorites_comics'));
    if(favoritesSaved.some(fav => fav.id === comic.id)){
      favoritesSaved = favoritesSaved.filter(fav => fav.id !== comic.id);
    } else {
      favoritesSaved.push(comic);
    }
    localStorage.setItem('favorites_comics', JSON.stringify(favoritesSaved));
  }

  return {
    getComics,
    getSelectedComic,
    setSelectedComic,
    setComics,
    setFavoritesComics,
    getFavoritesComics
  }
}

export default useComicsData;
