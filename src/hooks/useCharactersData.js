import { useContext } from "react";
import {  ConfiguratorContext } from "../context";

const useCharactersData = () => {
    const [state, setState] = useContext(ConfiguratorContext);

    //Getters
    const getCharacters = () => state.characters;

    return {
        getCharacters
    }
}

export default useCharactersData;
