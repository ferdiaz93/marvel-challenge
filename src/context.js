import React, { useState, useEffect } from "react";
import Axios from 'axios';
import md5 from 'md5'
import env from "react-dotenv";

const initialContext = {
    loading: true,
    characters: [],
    comics: [],
    stories: [],
    series: [],
}

const ConfiguratorContext = React.createContext();

const ConfiguratorProvider = ({children}) => {
    const [state, setState] = useState(initialContext);
    let milliseconds = Number(new Date());
    let hash = md5(milliseconds + env.PRIVATE_KEY + env.PUBLIC_KEY);
    let apiParameters = `ts=${milliseconds}&apikey=${env.PUBLIC_KEY}&hash=${hash}`;

    const getCharacters = () => Axios.get(`${env.API_URL}/characters?${apiParameters}&nameStartsWith=ma&limit=20&offset=20`);
    const getComics = () => Axios.get(`${env.API_URL}/comics?${apiParameters}`);
    const getSeries = () => Axios.get(`${env.API_URL}/series?${apiParameters}`);
    const getStories = () => Axios.get(`${env.API_URL}/stories?${apiParameters}`);

    useEffect(() => {
        Promise.all([getCharacters(), getComics(), getSeries(), getStories()]).then(response => {
            let characters = response[0].data.data.results;
            let comics = response[1].data.data.results;
            let series = response[2].data.data.results;
            let stories = response[3].data.data.results;
            console.log(characters, "personajes");
            console.log(comics, "comics");
            console.log(series, "series");
            console.log(stories, "stories");
            initData(characters, comics, series, stories)
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
                characters:characters,
                comics: comics,
                series: series,
                stories: stories
            }
        })
    }
    return <ConfiguratorContext.Provider value={[state, setState]}>{children}</ConfiguratorContext.Provider>;
}

export { ConfiguratorContext, ConfiguratorProvider, initialContext };
