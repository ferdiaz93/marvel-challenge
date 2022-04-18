import React, { useState, useEffect } from 'react';

import './assets/scss/App.scss';
import { ConfiguratorProvider } from "./context";
import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';
import HomePage from './views/HomePage';
import ComicsPage from './views/ComicsPage';
import Search from './components/Search';

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
          <Route path={"comic/:comic_id"} element={<ComicsPage />}></Route>
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
