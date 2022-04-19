import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import usedComicsData from '../hooks/useComicsData';

const ComicPage = () => {
  const { comic_id } = useParams();
  const { getSelectedComic, setSelectedComic } = usedComicsData();

  const selectedComic = getSelectedComic();

  useEffect(() => {
    setSelectedComic(comic_id);
  }, []);

  return (
    <section className="comic-page-container">
      {selectedComic?.info ?
        <>
          <div className="header"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 100%), url(${selectedComic.info.thumbnail.path}/landscape_incredible.${selectedComic.info.thumbnail.extension})`
            }}>
            <h1>{selectedComic.info.title}</h1>
          </div>
          <div className="body wrapper">
            <div className="content">
              <img src={`${selectedComic.info.thumbnail.path}/portrait_incredible.${selectedComic.info.thumbnail.extension}`}></img>
              <div>
                <h2>Description</h2>
                <p>{selectedComic.info.description}</p>
              </div>
            </div>
            <div className="links">

            </div>
          </div>
        </>
        : null}
    </section>
  )
}

export default ComicPage;