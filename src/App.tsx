import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Intro from "./components/intro/Intro";
import Lobby from "./components/lobby/Lobby";
import Game from "./components/game/Game";
import userContext from './userContext';

function App() {

  const playerId = localStorage.getItem("playerId")

  const [playerData, setPlayerData] = useState({});
  
  useEffect(() => {
    async function getPlayerData
  });
  
  //check if there is existing player data in local storage
  //if so, make api call for user data, and then set state for playerData
  //and pass that context down

  //if no data exists, do nothing, run as is


  return (
    <userContext.Provider value={playerData}>
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
    </userContext.Provider>
  );
}

export default App;

// playerId: '1'