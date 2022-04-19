import { useContext } from "react";
import { ConfiguratorContext } from "../context";

const useSearchData = () => {
  const [state, setState] = useContext(ConfiguratorContext);

  //getters
  const getInputSearchValue = () => state.inputSearchValue;
  const getSelectSearchValue = () => state.selectSearchValue;

  //setter
  const setInputSearchValue = (value) => {
    setState(prevState => {
      return {
        ...prevState,
        inputSearchValue: value
      }
    })
  }

  const setSelectSearchValue = (value) => {
    setState(prevState => {
      return {
        ...prevState,
        selectSearchValue: value
      }
    })
  }

  return {
    getInputSearchValue,
    setInputSearchValue,
    getSelectSearchValue,
    setSelectSearchValue,
  }
}

export default useSearchData;
