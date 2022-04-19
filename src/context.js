import React, { useState, useEffect } from "react";

const initialContext = {
  loading: true,
  selectedCharacter: null,
  selectedComic: null,
  selectedSerie: null,
  characters: [],
  comics: [],
  stories: [],
  series: [],
  deletedCharacters: [],
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
    if(!localStorage.getItem("removed_characters")){
      localStorage.setItem('removed_characters', JSON.stringify([]));
    }else{
      setState(prevState=> {
        return{
          ...prevState,
          deletedCharacters: JSON.parse(localStorage.getItem('removed_characters'))
        }
      })
    }
  }, [])

  return <ConfiguratorContext.Provider value={[state, setState]}>{children}</ConfiguratorContext.Provider>;
}

export { ConfiguratorContext, ConfiguratorProvider, initialContext };
