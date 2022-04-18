import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = ({ title, type, id, favorite, description, imageUrl }) => {
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
            <FavoriteIcon/> 
            :
            <FavoriteBorderIcon />
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