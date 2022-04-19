import React, { useEffect } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useSeriesData from '../hooks/useSeriesData';


const SeriesPage = () => {
  const { getSeries, setSeries } = useSeriesData();
  const { getInputSearchValue } = useSearchData();
  const series = getSeries();
  const inputSearchValue = getInputSearchValue();

  useEffect(() => {
    if (inputSearchValue) {
      setSeries(inputSearchValue);
    }
  }, [inputSearchValue])

  return (
    <>
      <section className="homepage-container">
        <div className="homepage-content wrapper">
          <div className="characters-grid">
            {series.map(serie => {
              return (
                <Card
                  key={serie.id}
                  id={serie.id}
                  title={serie.title}
                  description={serie.description}
                  type={serie.type}
                  imageUrl={`${serie.thumbnail.path}/landscape_xlarge.${serie.thumbnail.extension}`} />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default SeriesPage;