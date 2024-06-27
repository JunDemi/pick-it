import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import '../src/assets/global.scss';
import CreateGame from './pages/CreateGame';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addgame' element={<CreateGame/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
