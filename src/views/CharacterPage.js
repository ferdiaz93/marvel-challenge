import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useCharactersData from '../hooks/useCharactersData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CharacterPage = () => {
  const { character_id } = useParams();
  const { getSelectedCharacter, setSelectedCharacter, updateRemovedCharacters } = useCharactersData();

  const selectedCharacter = getSelectedCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCharacter(character_id);
  }, [])
  
  const removeCharacter = () => {
    let deletedCharacters = JSON.parse(localStorage.getItem('removed_characters'));
    deletedCharacters.push(selectedCharacter);
    localStorage.setItem('removed_characters', JSON.stringify(deletedCharacters));
    updateRemovedCharacters();
    navigate('/characters')
  }

  return (
    <section className="character-page-container">
      {selectedCharacter?.info ?
        <>
          <div className="header"
            style={{ 
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 100%), url(${selectedCharacter.info.thumbnail.path}/landscape_incredible.${selectedCharacter.info.thumbnail.extension})` }}>
            <h1>{selectedCharacter.info.name}</h1>
          </div>
          <div className="body wrapper">
            <div className="content">
              <img src={`${selectedCharacter.info.thumbnail.path}/portrait_incredible.${selectedCharacter.info.thumbnail.extension}`}></img>
              <div className="details">
                <div className="title-container">
                  <h2>Description</h2>
                  <div className="buttons-container">
                    <button className="button remove" onClick={removeCharacter}><DeleteIcon></DeleteIcon></button>
                  </div>
                </div>
                <p>{selectedCharacter.info.description}</p>
              </div>
            </div>
            <div className="links">
              
            </div>
          </div>
        </>
        : null}
    </section>
  )
}

export default CharacterPage;