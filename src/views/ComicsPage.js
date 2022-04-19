import React, { useState, useEffect } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useComicsData from '../hooks/useComicsData';


const ComicsPage = () => {
  const { getComics, setComics } = useComicsData();
  const { getInputSearchValue } = useSearchData();
  const comics = getComics();
  const inputSearchValue = getInputSearchValue();

  useEffect(() => {
    if (inputSearchValue) {
      setComics(inputSearchValue);
    }
  }, [inputSearchValue])

  return (
    <>
      <section className="homepage-container">
        <div className="homepage-content wrapper">
          <div className="characters-grid">
            {comics.map(character => {
              return (
                <Card
                  key={character.id}
                  id={character.id}
                  title={character.title}
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

export default ComicsPage;