import React, { useState, useEffect } from "react";
import Axios from 'axios';
import md5 from 'md5'

const initialContext = {
  loading: true,
  selectedCharacter: null,
  selectedComic: null,
  selectedStory: null,
  selectedSerie: null,
  characters: [],
  comics: [],
  stories: [],
  series: [],
}

const ConfiguratorContext = React.createContext();

const ConfiguratorProvider = ({ children }) => {
  const [state, setState] = useState(initialContext);
  let milliseconds = Number(new Date());
  let hash = md5(milliseconds + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
  let apiParameters = `ts=${milliseconds}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`;

  const getCharacters = () => Axios.get(`${process.env.REACT_APP_API_URL}/characters?${apiParameters}`);
  const getComics = () => Axios.get(`${process.env.REACT_APP_API_URL}/comics?${apiParameters}`);
  const getSeries = () => Axios.get(`${process.env.REACT_APP_API_URL}/series?${apiParameters}`);
  const getStories = () => Axios.get(`${process.env.REACT_APP_API_URL}/stories?${apiParameters}`);

  useEffect(() => {
    Promise.all([getCharacters()]).then(response => {
      let characters = response[0].data.data.results;
      characters.forEach(character => character.type = "character");
      console.log(characters, "personajes");
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

  const initData = (characters, comics, series, stories) => {
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
