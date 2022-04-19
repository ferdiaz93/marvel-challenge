import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { apiParameters } from "./utils";

const initialContext = {
  loading: true,
  selectedCharacter: null,
  selectedComic: null,
  selectedSerie: null,
  characters: [],
  comics: [],
  stories: [],
  series: [],
  inputSearchValue: "",
  selectSearchValue: "characters",
}

const ConfiguratorContext = React.createContext();

const ConfiguratorProvider = ({ children }) => {
  const [state, setState] = useState(initialContext);
  const getCharacters = () => Axios.get(`${process.env.REACT_APP_API_URL}/characters?${apiParameters()}`);

  useEffect(() => {
    getCharacters().then(response => {
      let characters = response.data.data.results;
      characters.forEach(character => character.type = "character");
      initData(characters)
    })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setState(prevState => ({
          ...prevState,
          loading: false
        }))
      })
  }, [])

  const initData = (characters) => {
    setState(prevstate => {
      return {
        ...prevstate,
        characters: characters,
      }
    })
  }
  return <ConfiguratorContext.Provider value={[state, setState]}>{children}</ConfiguratorContext.Provider>;
}

export { ConfiguratorContext, ConfiguratorProvider, initialContext };
