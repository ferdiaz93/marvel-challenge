import React, { useEffect, useState } from 'react'
import useSearchData from '../hooks/useSearchData';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <form className="search-container" onSubmit={(e) => handleSubmit(e)}>
      <ThemeProvider theme={darkTheme}>
        <TextField label="Search" color="primary" focused fullWidth onChange={handleInput}/>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
      </ThemeProvider>
      <div>
        <button className="button">Buscar</button>
      </div>
    </form>
  )
}

export default Search;