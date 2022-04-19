import React from 'react'
import useCharactersData from '../hooks/useCharactersData';
import useComicsData from '../hooks/useComicsData';

const Card = ({ title, type, id, favorite, description, imageUrl, fullItem }) => {
  const { setFavoritesCharacters } = useCharactersData();
  const { setFavoritesComics } = useComicsData();

  const toggleFavorite = () => {
    if (type === 'character') setFavoritesCharacters(fullItem)
    if (type === 'comic') setFavoritesComics(fullItem)
  }
  return (
    <div className="card-container">
      <div className="wrapper">
        <div className="content">
          <figure className="article">
            <img src={imageUrl} alt="card-view"/>
            <figcaption>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div className="buttons-container">
                {favorite ? 
                  <button className="button remove" onClick={toggleFavorite}>Remove from Favorites</button>
                : 
                  <button className="button add" onClick={toggleFavorite}>Add to Favorites</button>
                }
                <a className="button" href={`/${type}/${id}`}>View Details</a>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
      
    </div>
  )
}

export default Card;