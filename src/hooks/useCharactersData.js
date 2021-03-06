import axios from "axios";
import { useContext } from "react";
import { ConfiguratorContext } from "../context";
import { useNavigate } from 'react-router-dom';
import { apiParameters } from "../utils";

const useCharactersData = () => {
  const [state, setState] = useContext(ConfiguratorContext);
  const navigate = useNavigate();

  //Getters
  const getCharacters = () => state.characters;
  const getSelectedCharacter = () => state.selectedCharacter;
  const getFavoritesCharacters = () => JSON.parse(localStorage.getItem('favorites_characters'));
  const getDeletedCharacters = () => state.deletedCharacters;

  //setters
  const setSelectedCharacter = (id) => {
    const getCharacter = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}?${apiParameters()}`);
    const getComics = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}/comics?${apiParameters()}`);
    const getStories = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}/stories?${apiParameters()}`);
    const getSeries = () => axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}/series?${apiParameters()}`);

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
    }).catch(err => {
      console.log(err);
      setState(prevState => {
        return {
          ...prevState,
          selectedCharacter: null
        }
      })
      navigate('/');
    })
  }

  const setCharacters = (characters) => {
    setState(prevState => {
      return{
        ...prevState,
        characters: [...characters]
      }
    })
  }

  const setFavoritesCharacters = (character) => {
    let favoritesSaved = JSON.parse(localStorage.getItem('favorites_characters'));
    if(favoritesSaved.some(fav => fav.id === character.id)){
      favoritesSaved = favoritesSaved.filter(fav => fav.id !== character.id);
    } else {
      favoritesSaved.push(character);
    }
    let characters = state.characters;
    characters.forEach(charac =>{
      if(character.id == charac.id) charac.favorite = !charac.favorite
    })
    setState(prevState => {
      return {
        ...prevState,
        characters: [...characters]
      }
    })
    localStorage.setItem('favorites_characters', JSON.stringify(favoritesSaved));
  }
  

  const updateRemovedCharacters = () => {
    let deletedCharacters = JSON.parse(localStorage.getItem('removed_characters'));
    setState(prevState => {
      return{
        ...prevState,
        deletedCharacters: [...deletedCharacters]
      }
    })
  }

  return {
    getCharacters,
    getSelectedCharacter,
    setSelectedCharacter,
    setCharacters,
    setFavoritesCharacters,
    getFavoritesCharacters,
    getDeletedCharacters,
    updateRemovedCharacters
  }
}

export default useCharactersData;
