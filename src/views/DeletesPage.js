import React, { useEffect } from 'react';
import DeletedCard from '../components/DeletedCard';
import useCharactersData from '../hooks/useCharactersData';


const DeletesPage = () => {
  const { getDeletedCharacters } = useCharactersData();
  const deletedCharacters = getDeletedCharacters();
  console.log(deletedCharacters);

  useEffect(() => {
    console.log(deletedCharacters);
  }, [])

  return (
    <>
      <section className="deletes-container">
        <div className="deletes-content wrapper">
          <h1>Characters</h1>
          <div className="characters grid">
            {deletedCharacters?.length ?
              deletedCharacters?.map(character => {
                return (
                  <DeletedCard
                    key={character.info.id}
                    id={character.info.id}
                    fullItem={character.info}
                    title={character.info.name}
                    description={character.info.description}
                    type={character.info.type}
                    favorite={character.info.favorite}
                    imageUrl={`${character.info.thumbnail.path}/landscape_xlarge.${character.info.thumbnail.extension}`} />
                )
              })
              :
              <h3>You didn't remove characters</h3>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default DeletesPage;