import React, { useState } from 'react'

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  }

  return (
    <form className="search-container" onSubmit={(e) => handleSubmit(e)}>
      <div><input type="text" value={inputValue} onChange={handleInput} /></div>
      <div>
        <label htmlFor="types">Choose:</label>
        <select name="types" id="types" value={selectValue} onChange={handleSelect}>
          <option value="all">All</option>
          <option value="character">Character</option>
          <option value="comic">Comic</option>
          <option value="stories">Stories</option>
          <option value="serie">Serie</option>
        </select>
      </div>
      <div>
        <button className="button">Buscar</button>
      </div>
    </form>
  )
}

export default Search;