import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Intro from "./components/intro/Intro";
import LobbyAuth from './LobbyAuth';
import Game from "./components/game/Game";
import userContext from './userContext';
import BoggleApi from './api';
import EnterPlayerNameForm from './EnterPlayerNameForm';
import { PlayerDataInterface } from './interfaces';
// import { socket } from "./socket";

const defaultPlayerData = {
  playerId: 0,
  playerName: '',
  currLobby: ''
}

/**
 * Render App
 *
 * State: none
 * Props: none
 *
 * App -> BrowserRouter -> Routes || EnterPlayerNameForm
 */

function App() {
  console.debug("Entered app component");

  const playerId = localStorage.getItem("playerId")

  let sessionPlayerData = sessionStorage.getItem("playerData")
  let sessionPlayerDataParsed: PlayerDataInterface = sessionPlayerData !== null
                                                      ? JSON.parse(sessionPlayerData)
                                                      : defaultPlayerData;

  const [playerData, setPlayerData] = useState(sessionPlayerDataParsed);

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

    // socket.on('test', (msg) =>  console.log('THIS IS A TEST MESSAGE: ', msg))

    // return () => {
    //   socket.off('test');
    // };
  }, [playerId, sessionPlayerData]);


  function updatePlayerData(updatedPlayerData: PlayerDataInterface) {
    let newPlayerData = { ...playerData, ...updatedPlayerData };
    sessionStorage.setItem('playerData', JSON.stringify(newPlayerData));
    setPlayerData(() => newPlayerData);
  }

  function setPlayerId(playerId: string) {
    localStorage.setItem('playerId', String(playerId));
  }

  return (
    <userContext.Provider value={
      {
        playerData,
        updatePlayerData,
        setPlayerId,
      }
    }>
      <div className="App">
        <BrowserRouter>
          <Nav />
          {
          !playerData.playerName
            ? <EnterPlayerNameForm />
            : <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/lobby/:id" element={<LobbyAuth />} />
                <Route path="/game/:id" element={<Game />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          }
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;