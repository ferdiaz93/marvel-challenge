import React, { useState, useEffect } from 'react';
import useCharactersData from '../hooks/useCharactersData'
import Card from '../components/Card';


const HomePage = () => {
  const { getCharacters } = useCharactersData();
  const characters = getCharacters();

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
                  imageUrl={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}/>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage;