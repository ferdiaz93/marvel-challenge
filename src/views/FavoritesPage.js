import React, { useEffect } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useCharactersData from '../hooks/useCharactersData';
import useComicsData from '../hooks/useComicsData';
import useSeriesData from '../hooks/useSeriesData';


const FavoritesPage = () => {
  const { getFavoritesCharacters } = useCharactersData();
  const { getFavoritesComics } = useComicsData();
  const { getFavoritesSeries } = useSeriesData();
  const favoritesCharacters = getFavoritesCharacters();
  const favoritesComics = getFavoritesComics();
  const favoritesSeries = getFavoritesSeries();
  
  useEffect(() => {
  }, [])

  return (
    <>
      <section className="favorites-container">
        <div className="favorites-content wrapper">
          <h1>Characters</h1>
          <div className="characters grid">
            {favoritesCharacters.length ? 
              favoritesCharacters?.map(character => {
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
            :
              <h3>You didn't added characters to favorites</h3>
            }
          </div>
          <h1>Comics</h1>
          <div className="comics grid">
            {favoritesComics.length ? 
              favoritesComics.map(comic => {
                return (
                  <Card
                    key={comic.id}
                    id={comic.id}
                    title={comic.title}
                    description={comic.description}
                    type={comic.type}
                    favorite={comic.favorite}
                    imageUrl={`${comic.thumbnail.path}/landscape_xlarge.${comic.thumbnail.extension}`}
                    fullItem={comic}/>
                )
              })
            :
              <h3>You didn't added comics to favorites</h3>
            }
          </div>
          <h1>Series</h1>
          <div className="comics grid">
            {favoritesSeries.length ? 
              favoritesSeries.map(comic => {
                return (
                  <Card
                    key={comic.id}
                    id={comic.id}
                    title={comic.title}
                    description={comic.description}
                    type={comic.type}
                    favorite={comic.favorite}
                    imageUrl={`${comic.thumbnail.path}/landscape_xlarge.${comic.thumbnail.extension}`}
                    fullItem={comic}/>
                )
              })
            :
              <h3>You didn't added comics to favorites</h3>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default FavoritesPage;