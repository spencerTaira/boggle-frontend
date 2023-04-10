import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Intro from "./components/intro/Intro";
import Lobby from "./components/lobby/Lobby";
import Game from "./components/game/Game";
import userContext from './userContext';
import BoggleApi from './api';

interface PlayerDataInterface {
  playerId: number,
  playerName: string,
  currLobby: string
}

interface PlayerMessageInterface {
  playerName: string,
  message: string
}

/**
 * Render App
 *
 * State: none
 * Props: none
 *
 * App -> Intro
 */

function App() {
  console.debug("Entered app component");

  const playerId = localStorage.getItem("playerId")

  let sessionPlayerData = sessionStorage.getItem("playerData")
  if (sessionPlayerData !== null) {
    sessionPlayerData = JSON.parse(sessionPlayerData)
  }

  const [playerData, setPlayerData] = useState(sessionPlayerData || {});
  const [playerMessages, setPlayerMessages] = useState<Array<PlayerMessageInterface>>([])

  console.debug("App: what is playerData?", playerData);
  console.debug("App: what is playerId", playerId);

  useEffect(function getPlayerDataOnMount() {
    async function getPlayerData() {
      if (playerId !== null && sessionPlayerData === null) {

        const result = await BoggleApi.getPlayerData(playerId);
        if (result.error !== undefined) {
          //TODO: Add error handling
        } else {
          setPlayerData(() => result.playerData);
          sessionStorage.setItem("playerData", JSON.stringify(result.playerData));
        }
      }
    }
    getPlayerData();
  }, [playerId, sessionPlayerData]);


  function updatePlayerData(updatedPlayerData: PlayerDataInterface) {
    let newPlayerData = { ...playerData, ...updatedPlayerData };
    sessionStorage.setItem('playerData', JSON.stringify(newPlayerData));
    setPlayerData(() => newPlayerData);
  }

  function setPlayerId(playerId: string) {
    localStorage.setItem('playerId', String(playerId));
  }

  function appendMessages(newMessage: PlayerMessageInterface) {
    setPlayerMessages((prevMessages) => ([...prevMessages, newMessage]))
  }

  return (
    <userContext.Provider value={
      { 
        playerData, 
        playerMessages, 
        updatePlayerData, 
        setPlayerId,
        appendMessages
      }
    }>
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

/*
Thoughts/planning

player id stored to recall saved name
keep room info in session storage (roomId/pw)

*/