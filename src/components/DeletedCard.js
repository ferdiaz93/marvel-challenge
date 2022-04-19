import React from 'react'
import useCharactersData from '../hooks/useCharactersData';

const DeletedCard = ({ title, type, id, favorite, description, imageUrl, fullItem }) => {
  const { updateRemovedCharacters } = useCharactersData();

  const restoreItem = () => {
    let removedCharacters = JSON.parse(localStorage.getItem('removed_characters'));
    removedCharacters = removedCharacters.filter(character => character.id != id);
    localStorage.setItem('removed_characters', JSON.stringify(removedCharacters));
    updateRemovedCharacters()
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
                <button className="button remove" onClick={restoreItem}>Restore</button>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
      
    </div>
  )
}

export default DeletedCard;