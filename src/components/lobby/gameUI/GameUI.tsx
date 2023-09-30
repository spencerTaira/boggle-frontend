import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import BoggleApi from "../../../api";
// import userContext from "../../../userContext";
// import ChatBox from "../ChatBox";
// import { socket, socketLobby } from "../../../socket";

function GameUI({gameState, lobbyId}:{gameState:Function, lobbyId: string}) {
    console.debug('GameUI');

    function endGame(){
        gameState(false)
    }

    useEffect(() => {
        async function getBoard() {
            const result = await BoggleApi.getBoard(lobbyId);

            console.log('This is game board:', result);
        }

        getBoard();
    }, [lobbyId]);

    return (
        <div>GAMEMEMEM
            <button onClick={endGame}>Start</button>
        </div>
    );
}

export default GameUI;

/*
    Host clicks start
    Backend creates Gameboard and Caches
    Host receives json from backend
    Host emits start to everyone including himself
    Everyone's SPA changes to GameUI
    Makes static web request with Lobby ID
    Backend gets request and gets gameboard out of cache and returns
*/