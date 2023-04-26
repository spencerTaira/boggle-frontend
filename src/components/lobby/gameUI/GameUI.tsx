import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoggleAPI from "../../../api";
import userContext from "../../../userContext";
import ChatBox from "../ChatBox";
import { socket, socketLobby } from "../../../socket";

function GameUI({gameState}:{gameState:Function}) {
    function endGame(){
        gameState(false)
    }
    
    return (
        <div>GAMEMEMEM
            <button onClick={endGame}>Start</button>
        </div>
    );
}

export default GameUI;