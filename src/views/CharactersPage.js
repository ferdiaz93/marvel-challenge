import React, { useState, useEffect } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useCharactersData from '../hooks/useCharactersData';


const CharactersPage = () => {
  const { getCharacters, setCharacters } = useCharactersData();
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
      <section className="homepage-container">
        <div className="homepage-content wrapper">
          <div className="characters-grid">
            {characters.map(character => {
              return (
                <Card
                  key={character.id}
                  id={character.id}
                  title={character.name}
                  description={character.description}
                  type={character.type}
                  imageUrl={`${character.thumbnail.path}/landscape_xlarge.${character.thumbnail.extension}`} />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default CharactersPage;