import React, { useEffect } from 'react';
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
      <section className="comicspage-container">
        <div className="comicspage-content wrapper">
          <div className="grid">
            {comics.map(comic => {
              return (
                <Card
                  key={comic.id}
                  id={comic.id}
                  title={comic.title}
                  description={comic.description}
                  type={comic.type}
                  imageUrl={`${comic.thumbnail.path}/landscape_xlarge.${comic.thumbnail.extension}`}
                  fullItem={comic}
                  favorite={comic.favorite}/>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default ComicsPage;