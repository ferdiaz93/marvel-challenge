import React, { useEffect, useState } from 'react'
import useSearchData from '../hooks/useSearchData';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const { getInputSearchValue, setInputSearchValue, getSelectSearchValue, setSelectSearchValue } = useSearchData();
  const inputSearchValue = getInputSearchValue();
  const selectSearchValue = getSelectSearchValue();
  const navigate = useNavigate();

  const [ inputText , setInputText] = useState("");
  const [ selectValue , setSelectValue] = useState("");

  useEffect(()=> {
    setInputText(inputSearchValue)
    setSelectValue(selectSearchValue)
  }, [inputSearchValue, selectSearchValue])

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputSearchValue(inputText);
    setSelectSearchValue(selectValue);
    navigate(selectValue)
  }

  const handleInput = (e) => {
    setInputText(e.target.value);
  }

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  }

  return (
    <form className="search-container" onSubmit={(e) => handleSubmit(e)}>
      <div><input type="text" value={inputText} onChange={handleInput} /></div>
      <div>
        <label htmlFor="types">Choose:</label>
        <select name="types" id="types" value={selectValue} onChange={handleSelect}>
          <option value="characters">Characters</option>
          <option value="comics">Comics</option>
          <option value="series">Series</option>
        </select>
      </div>
      <div>
        <button className="button">Buscar</button>
      </div>
    </form>
  )
}

export default Search;