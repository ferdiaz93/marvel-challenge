import React from 'react';
import './assets/scss/App.scss';
import { ConfiguratorProvider } from "./context";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import logo from './assets/images/marvel_logo.png'
import Search from './components/Search';

import HomePage from './views/HomePage';
import CharacterPage from './views/CharacterPage';
import ComicPage from './views/ComicPage';
import SeriePage from './views/SeriePage';
import CharactersPage from './views/CharactersPage';
import ComicsPage from './views/ComicsPage';
import SeriesPage from './views/SeriesPage';
import FavoritesPage from './views/FavoritesPage';
import DeletesPage from './views/DeletesPage';

  function App() {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#1976d2',
        },
      },
    });
  return (
    <BrowserRouter>
      <ConfiguratorProvider>
        <ThemeProvider theme={darkTheme}>
          <header>
            <a className="marvel-logo" href='/'>
              <img src={logo}/>
            </a>
            <Search />
            <a className="button favorite-button" href='/favorites'>See Favorites</a>
            <a className="button favorite-button" href='/deletes'>See Deletes</a>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path={"characters"} element={<CharactersPage />}></Route>
            <Route path={"character/:character_id"} element={<CharacterPage />}></Route>
            <Route path={"comics"} element={<ComicsPage />}></Route>
            <Route path={"comic/:comic_id"} element={<ComicPage />}></Route>
            <Route path={"series"} element={<SeriesPage />}></Route>
            <Route path={"serie/:serie_id"} element={<SeriePage />}></Route>
            <Route path={"favorites"} element={<FavoritesPage />}></Route>
            <Route path={"deletes"} element={<DeletesPage />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </ThemeProvider>
      </ConfiguratorProvider>
    </BrowserRouter>
  );
}

export default App;
