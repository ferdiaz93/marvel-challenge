import React, { useEffect, useState } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useSeriesData from '../hooks/useSeriesData';
import { Skeleton, Stack } from '@mui/material';
import { apiParameters } from '../utils';
import axios from 'axios';


const SeriesPage = () => {
  const { getSeries, setSeries } = useSeriesData();
  const { getInputSearchValue } = useSearchData();
  const series = getSeries();
  const inputSearchValue = getInputSearchValue();

  const [responseMessage, setResponseMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setResponseMessage(null);
    setLoading(true);
    let favoritesSaved = JSON.parse(localStorage.getItem('favorites_series'));
    axios.get(`${process.env.REACT_APP_API_URL}/series?${inputSearchValue ? "titleStartsWith="+inputSearchValue+"&" : ""}${apiParameters()}`)
    .then(response => {
      let seriesResponse = response.data.data.results;
      seriesResponse.forEach(serie => {
        serie.type = "serie";
        serie.favorite = favoritesSaved.some(fav => fav.id == serie.id);
      });
      setSeries(seriesResponse);
      if(seriesResponse.length === 0){
        setResponseMessage('No results')
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
  }, [inputSearchValue])

  return (
    <>
      <section className="seriespage-container">
        <div className="seriespage-content wrapper">
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
              series.map(serie => {
                return (
                  <Card
                    key={serie.id}
                    id={serie.id}
                    title={serie.title}
                    description={serie.description}
                    type={serie.type}
                    fullItem={serie}
                    favorite={serie.favorite}
                    imageUrl={`${serie.thumbnail.path}/landscape_xlarge.${serie.thumbnail.extension}`} />
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

export default SeriesPage;