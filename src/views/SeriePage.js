import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import usedSeriesData from '../hooks/useSeriesData';

const SeriePage = () => {
  const { serie_id } = useParams();
  const { getSelectedSerie, setSelectedSerie } = usedSeriesData();

  const selectedSerie = getSelectedSerie();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSerie(serie_id);
  }, [])

  useEffect(() => {
    if(!selectedSerie){
      navigate('/')
    }
  });

  return (
    <section className="comic-page-container">
      {selectedSerie?.info ?
        <>
          <div className="header"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 100%), url(${selectedSerie.info.thumbnail.path}/landscape_incredible.${selectedSerie.info.thumbnail.extension})`
            }}>
            <h1>{selectedSerie.info.title}</h1>
          </div>
          <div className="body wrapper">
            <div className="content">
              <img src={`${selectedSerie.info.thumbnail.path}/portrait_incredible.${selectedSerie.info.thumbnail.extension}`}></img>
              <div>
                <h2>Description</h2>
                <p>{selectedSerie.info.description}</p>
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

export default SeriePage;