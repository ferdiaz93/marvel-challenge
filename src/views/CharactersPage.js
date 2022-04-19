import React, { useState, useEffect } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useCharactersData from '../hooks/useCharactersData';


const CharactersPage = () => {
  const { getCharacters, setCharacters, setNewFavoriteCharacter } = useCharactersData();
  const { getInputSearchValue } = useSearchData();
  const characters = getCharacters();
  const inputSearchValue = getInputSearchValue();

  useEffect(() => {
    if(inputSearchValue){
      setCharacters(inputSearchValue);
    }
  },[inputSearchValue])

  return (
    <>
      <section className="characterspage-container">
        <div className="characterspage-content wrapper">
          <div className="grid">
            {characters.map(character => {
              return (
                <Card
                  key={character.id}
                  id={character.id}
                  fullItem={character}
                  title={character.name}
                  description={character.description}
                  type={character.type}
                  favorite={character.favorite}
                  imageUrl={`${character.thumbnail.path}/landscape_xlarge.${character.thumbnail.extension}`}/>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default CharactersPage;