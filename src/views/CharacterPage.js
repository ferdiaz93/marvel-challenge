import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useCharactersData from '../hooks/useCharactersData';


const CharacterPage = () => {
  const { character_id } = useParams();
  const { getSelectedCharacter, setSelectedCharacter } = useCharactersData();

  const selectedCharacter = getSelectedCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(character_id, "ID");
    setSelectedCharacter(character_id);
  }, [])
  
  useEffect(() => {
    if(!selectedCharacter){
      navigate('/')
    }
  })

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
              <div>
                <h2>Description</h2>
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