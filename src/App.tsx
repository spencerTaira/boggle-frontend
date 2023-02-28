import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
          <Route path="/" element={<Intro />} />
          <Route path="/lobby/:id" element={<Lobby />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
