import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useCharactersData from '../hooks/useCharactersData';
import useComicsData from '../hooks/useComicsData';

const Card = ({ title, type, id, favorite, description, imageUrl, fullItem }) => {
  const { setFavoritesCharacters } = useCharactersData();
  const { setFavoritesComics } = useComicsData();

  const toggleFavorite = () => {
    if(type == 'character') setFavoritesCharacters(fullItem)
    if(type == 'comic') setFavoritesComics(fullItem)
  }
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="image-container">
          <img src={imageUrl}></img>
        </div>
      </div>
      <div className="card-body">
        <div className="title-container">
          <h2>{title} <small>({type})</small></h2>
          {favorite ? 
            <a onClick={toggleFavorite}>
              <FavoriteIcon/> 
            </a>
            :
            <a onClick={toggleFavorite}>
              <FavoriteBorderIcon />
            </a>
          }
        </div>
        <p>{description}</p>
      </div>
      <div className="footer">
        <a className="button" href={`/${type}/${id}`}>View Details</a>
      </div>
    </div>
  )
}

export default Card;