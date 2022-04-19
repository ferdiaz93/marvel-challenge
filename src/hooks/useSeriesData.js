import axios from "axios";
import md5 from "md5";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConfiguratorContext } from "../context";

const useSeriesData = () => {
  const [state, setState] = useContext(ConfiguratorContext);
  const navigate = useNavigate();

  //Getters
  const getSeries = () => state.series;
  const getSelectedSerie = () => state.selectedSerie;

  //setters
  const setSelectedSerie = (id) => {
    let milliseconds = Number(new Date());
    let hash = md5(milliseconds + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
    let apiParameters = `ts=${milliseconds}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`;

    const getSerie = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}?${apiParameters}`);
    const getComics = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}/comics?${apiParameters}`);
    const getCharacters = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}/characters?${apiParameters}`);
    const getStories = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}/stories?${apiParameters}`);

    Promise.all([getSerie(), getComics(), getCharacters(), getStories()]).then(response => {
      const serie = response[0].data.data.results[0];
      const comics = response[0].data.data.results;
      const characters = response[1].data.data.results;
      const stories = response[2].data.data.results;

      setState(prevState => {
        return {
          ...prevState,
          selectedSerie: {
            ...prevState.selectedSerie,
            id: id,
            info: serie,
            comics,
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
          selectedSerie: null
        }
      });
      navigate('/')
    })
  }

  const setSeries = (inputValue) => {
    let milliseconds = Number(new Date());
    let hash = md5(milliseconds + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
    let apiParameters = `ts=${milliseconds}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`;

    const getSeries = () => axios.get(`${process.env.REACT_APP_API_URL}/series?titleStartsWith=${inputValue}&${apiParameters}`);
    getSeries().then(response => {
      let series = response.data.data.results;
      console.log(series, "SERIES");
      series.forEach(character => character.type = "serie");
      setState((prevState)=> {
        return{
          ...prevState,
          series: response.data.data.results
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

  return {
    getSeries,
    getSelectedSerie,
    setSelectedSerie,
    setSeries
  }
}

export default useSeriesData;
