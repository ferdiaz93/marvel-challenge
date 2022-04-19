import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConfiguratorContext } from "../context";
import { apiParameters } from "../utils";

const useSeriesData = () => {
  const [state, setState] = useContext(ConfiguratorContext);
  const navigate = useNavigate();

  //Getters
  const getSeries = () => state.series;
  const getSelectedSerie = () => state.selectedSerie;
  const getFavoritesSeries = () => JSON.parse(localStorage.getItem('favorites_series'));

  //setters
  const setSelectedSerie = (id) => {
    const getSerie = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}?${apiParameters()}`);
    const getComics = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}/comics?${apiParameters()}`);
    const getCharacters = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}/characters?${apiParameters()}`);
    const getStories = () => axios.get(`${process.env.REACT_APP_API_URL}/series/${id}/stories?${apiParameters()}`);

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

  const setSeries = (series) => {
    setState(prevState => {
      return{
        ...prevState,
        series: [...series]
      }
    })
  }

  const setFavoritesSeries = (serie) => {
    let favoritesSaved = JSON.parse(localStorage.getItem('favorites_series'));
    if(favoritesSaved.some(fav => fav.id === serie.id)){
      favoritesSaved = favoritesSaved.filter(fav => fav.id !== serie.id);
    } else {
      favoritesSaved.push(serie);
    }
    let series = state.series;
    series.forEach(ser =>{
      if(serie.id == ser.id) ser.favorite = !ser.favorite
    })
    setState(prevState => {
      return {
        ...prevState,
        series: [...series]
      }
    })
    localStorage.setItem('favorites_series', JSON.stringify(favoritesSaved));
  }

  return {
    getSeries,
    getSelectedSerie,
    setSelectedSerie,
    setSeries,
    setFavoritesSeries,
    getFavoritesSeries
  }
}

export default useSeriesData;
