import React, { useEffect } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useCharactersData from '../hooks/useCharactersData';
import useComicsData from '../hooks/useComicsData';


const FavoritesPage = () => {
  const { getFavoritesCharacters } = useCharactersData();
  const { getFavoritesComics } = useComicsData();
  const favoritesCharacters = getFavoritesCharacters();
  const favoritesComics = getFavoritesComics();
  
  useEffect(() => {
  }, [])

  return (
    <>
      <section className="favorites-container">
        <div className="favorites-content wrapper">
          <h1>Characters</h1>
          <div className="characters grid">
            {favoritesCharacters?.map(character => {
              return (
                <Card
                  key={character.id}
                  id={character.id}
                  fullItem={character}
                  title={character.name}
                  description={character.description}
                  type={character.type}
                  imageUrl={`${character.thumbnail.path}/landscape_xlarge.${character.thumbnail.extension}`}/>
              )
            })}
          </div>
          <h1>Comics</h1>
          <div className="comics grid">
            {favoritesComics.map(comic => {
              return (
                <Card
                  key={comic.id}
                  id={comic.id}
                  title={comic.title}
                  description={comic.description}
                  type={comic.type}
                  imageUrl={`${comic.thumbnail.path}/landscape_xlarge.${comic.thumbnail.extension}`}
                  fullItem={comic}/>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default FavoritesPage;