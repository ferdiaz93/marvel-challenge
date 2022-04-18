import React, { useState, useEffect } from 'react';

import './assets/scss/App.scss';
import { ConfiguratorProvider } from "./context";
import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';
import Search from './components/Search';
import HomePage from './views/HomePage';
import CharacterPage from './views/CharacterPage';
import ComicPage from './views/ComicPage';
import StoryPage from './views/StoryPage';
import SeriePage from './views/SeriePage';

  function App() {
    const [age, setAge] = React.useState('');
    
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  return (
    <BrowserRouter>
      <ConfiguratorProvider>
        <Search />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path={"character/:character_id"} element={<CharacterPage />}></Route>
          <Route path={"comic/:comic_id"} element={<ComicPage />}></Route>
          <Route path={"story/:story_id"} element={<StoryPage />}></Route>
          <Route path={"serie/:serie_id"} element={<SeriePage />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
        <footer>
          <h1>FOOTER</h1>
        </footer>
      </ConfiguratorProvider>
    </BrowserRouter>
  );
}

export default App;
