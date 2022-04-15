import React, { useState, useEffect } from "react";
import Axios from 'axios';
import md5 from 'md5'
import env from "react-dotenv";

Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
Axios.defaults.xsrfCookieName = "csrftoken";
const initialContext = {
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
    
    const getCharacters = () => Axios.get(`${env.API_URL}/characters?ts=${milliseconds}&apikey=${env.PUBLIC_KEY}&hash=${hash}`);
    const getComics = () => Axios.get(`${env.API_URL}/comics?ts=${milliseconds}&apikey=${env.PUBLIC_KEY}&hash=${hash}`);

    useEffect(() => {
        Promise.all([getCharacters(), getComics()]).then(response => {
            let characters = response[0].data;
            let comics = response[1].data;
            console.log(characters, "personajes");
            console.log(comics, "comics");
        })
    }, [])

    const initData = () => {
        setState(prevstate => {
            return {
                ...prevstate
            }
        })
    }
    return <ConfiguratorContext.Provider value={[state, setState]}>{children}</ConfiguratorContext.Provider>;
}

export { ConfiguratorContext, ConfiguratorProvider, initialContext };
