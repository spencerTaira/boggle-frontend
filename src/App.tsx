import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Intro from "./components/intro/Intro";
import Lobby from "./components/lobby/Lobby";
import Game from "./components/game/Game";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/home" element={<Intro />} />
          <Route path="/lobby/:id" element={<Lobby />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
