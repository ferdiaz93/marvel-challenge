import React, { useState, useEffect } from 'react';
import useCharactersData from '../hooks/useCharactersData'
import Card from '../components/Card';
import background from '../assets/images/marvel_background.jpg'


const HomePage = () => {
  const { getCharacters } = useCharactersData();
  const characters = getCharacters();

  return (
    <>
      <section className="homepage-container">
        <div className="homepage-content"
        style={{ 
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 100%), url(${background})` }}>
            <h1>Marvel Challenge</h1>
        </div>
      </section>
    </>
  )
}

export default HomePage;