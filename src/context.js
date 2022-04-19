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

  useEffect(() => {
    if(!localStorage.getItem("favorites_characters")){
      localStorage.setItem('favorites_characters', JSON.stringify([]));
    }
    if(!localStorage.getItem("favorites_comics")){
      localStorage.setItem('favorites_comics', JSON.stringify([]));
    }
    if(!localStorage.getItem("favorites_series")){
      localStorage.setItem('favorites_series', JSON.stringify([]));
    }
  }, [])

  return <ConfiguratorContext.Provider value={[state, setState]}>{children}</ConfiguratorContext.Provider>;
}

export { ConfiguratorContext, ConfiguratorProvider, initialContext };
