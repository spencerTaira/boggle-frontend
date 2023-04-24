import { IntroLobbyInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import './LobbyCard.css'

function LobbyCard({lobbyData}:{lobbyData:IntroLobbyInterface}){
    const navigate = useNavigate();

    function joinLobby(lobbyName: string) {
        navigate(`/lobby/${lobbyName}`);
    }
    
    return(
        <div className='LobbyCard'>

            <span className="LobbyCard-lobby-name"><h4>{lobbyData.lobby_name}</h4></span>
            <span className="LobbyCard-curr-players"> {lobbyData.curr_players||0}
                <span className="LobbyCard-max-players">/{lobbyData.max_players} Players</span>
            </span>

            <button
                className="LobbyCard-join-button"
                onClick={() => joinLobby(lobbyData.lobby_name)}
            >
                Join
            </button>
        </div>
    )
}

export default LobbyCard;