import './assets/scss/App.scss';
import { ConfiguratorProvider } from "./context";
import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';
import HomePage from './views/HomePage';
import ComicsPage from './views/ComicsPage';

function App() {
  return (
    <ConfiguratorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/comics" element={<ComicsPage />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfiguratorProvider>
  );
}

export default App;
