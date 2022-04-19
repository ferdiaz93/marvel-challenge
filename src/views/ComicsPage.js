import React, { useEffect, useState } from 'react';
import useSearchData from '../hooks/useSearchData'
import Card from '../components/Card';
import useComicsData from '../hooks/useComicsData';
import { Skeleton, Stack } from '@mui/material';
import { apiParameters } from '../utils';
import axios from 'axios';


const ComicsPage = () => {
  const { getComics, setComics } = useComicsData();
  const { getInputSearchValue } = useSearchData();
  const comics = getComics();
  const inputSearchValue = getInputSearchValue();
  
  const [responseMessage, setResponseMessage] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setResponseMessage(null);
    setLoading(true);
    let favoritesSaved = JSON.parse(localStorage.getItem('favorites_comics'));
    axios.get(`${process.env.REACT_APP_API_URL}/comics?${inputSearchValue ? "titleStartsWith="+inputSearchValue+"&": ""}${apiParameters()}`)
    .then(response => {
      let comicsResponse = response.data.data.results;
      comicsResponse.forEach(comic => {
        comic.type = "comic";
        comic.favorite = favoritesSaved.some(fav => fav.id == comic.id);
      });
      setComics(comicsResponse);
      if(comicsResponse.length === 0){
        setResponseMessage('No results')
      }
    }).catch(err => {
      console.log(err);
    }).finally(()=>{
      setLoading(false);
    })
  }, [inputSearchValue])

  return (
    <>
      <section className="comicspage-container">
        <div className="comicspage-content wrapper">
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
              comics.map(comic => {
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

export default ComicsPage;