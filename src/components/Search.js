import React, { useEffect, useState } from 'react'
import useSearchData from '../hooks/useSearchData';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';


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
      <TextField label="Search" color="primary" focused fullWidth onChange={handleInput}/>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          label="Type"
          onChange={handleSelect}
        >
          <MenuItem value={"characters"} selected>Characters</MenuItem>
          <MenuItem value={"comics"}>Comics</MenuItem>
          <MenuItem value={"series"}>Series</MenuItem>
        </Select>
      </FormControl>
      <div>
        <button className="button">Buscar</button>
      </div>
    </form>
  )
}

export default Search;