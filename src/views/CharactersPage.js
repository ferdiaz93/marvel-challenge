import React, { useState, useEffect } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useCharactersData from '../hooks/useCharactersData';
import { Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import { apiParameters } from '../utils';

const CharactersPage = () => {
  const { getCharacters, setCharacters } = useCharactersData();
  const { getInputSearchValue } = useSearchData();
  const characters = getCharacters();
  const inputSearchValue = getInputSearchValue();

  const [responseMessage, setResponseMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setResponseMessage(null);
    setLoading(true);
    let favoritesSaved = JSON.parse(localStorage.getItem('favorites_characters'));
    setCharacters(inputSearchValue);
    axios.get(`${process.env.REACT_APP_API_URL}/characters?${inputSearchValue ? "nameStartsWith="+inputSearchValue+"&" : ""}${apiParameters()}`)
    .then(response => {
      let charactersResponse = response.data.data.results;
      charactersResponse.forEach(character => {
        character.type = "character";
        character.favorite = favoritesSaved.some(fav => fav.id == character.id);
      });
      setCharacters(charactersResponse);
      if(charactersResponse.length === 0){
        setResponseMessage('No results')
      }
    })
    .catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
  },[inputSearchValue])

  return (
    <>
      <section className="characterspage-container">
        <div className="characterspage-content wrapper">
          <div className="grid">
            {loading ? 
              <>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={350} height={525} />
                </Stack>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={350} height={525} />
                </Stack>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" width={350} height={525} />
                </Stack>
              </>
            :
              characters.map(character => {
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
              })
            }
            {responseMessage ? 
              <h2>{responseMessage}</h2>
            :
            null}
          </div>
        </div>
      </section>
    </>
  )
}

export default CharactersPage;