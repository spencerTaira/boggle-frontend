import { IntroLobbyInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

function LobbyCard({lobbyData}:{lobbyData:IntroLobbyInterface}){
    const navigate = useNavigate();

    function joinLobby(lobbyName: string) {
        navigate(`/lobby/${lobbyName}`);
    }
    
    return(
        <div className='LobbyCard'>

            <span className="lobby-name"><h4>{lobbyData.lobby_name}</h4></span>
            <span className="curr-players"> {lobbyData.curr_players||0}
                <span className="max-players">/{lobbyData.max_players} Players</span>
            </span>

            <button
                className="join-button"
                onClick={() => joinLobby(lobbyData.lobby_name)}
            >
                Join
            </button>
        </div>
    )
}

export default LobbyCard;