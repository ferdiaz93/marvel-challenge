import React, { useState, useEffect } from 'react';
import useCharactersData from '../hooks/useCharactersData'
import Card from '../components/Card';
const HomePage = () => {
  const { getCharacters } = useCharactersData();
  const characters = getCharacters();

  return (
    <>
      <section className="homepage-container">
        <div className="homepage-wrapper">
          <div className="characters-grid">
            {characters.map(character => {
              return (
                <Card 
                  key={character.id}
                  title={character.name}
                  description={character.description}
                  imageUrl={`${character.thumbnail.path}/landscape_xlarge.${character.thumbnail.extension}`}/>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage;