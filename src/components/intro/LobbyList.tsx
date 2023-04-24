import { IntroLobbyInterface } from "../../interfaces";
import { useState, useEffect } from "react";
import { socketIntro } from "../../socket";
import LobbyCard from "./LobbyCard";


function LobbyList(){
    const [lobbys, setLobbys] = useState<Array<IntroLobbyInterface>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function getLobbys() {
            socketIntro.emit('intro_get_lobbys');
        }

        const intervalId = setInterval(getLobbys, 2000);

        socketIntro.on('intro-send-lobbys', updateLobbys);

        return () => {
            socketIntro.off('intro-send-lobbys', updateLobbys);
            clearInterval(intervalId);
        };
    }, []);

    function updateLobbys(lobbysData: Array<IntroLobbyInterface>) {
        console.log('Lobby Data', lobbysData);
        setLobbys(() => lobbysData);
        setLoading(() => false);
    }

    if (loading){
        return(
            <p>Loading...</p>
        )
    }

    if(lobbys.length === 0){
        return(
            <p>There are currently no open lobbies</p>
        )
    }

    return (
        <div className="LobbyList">
        {lobbys.map((lobbyData:IntroLobbyInterface)=> <LobbyCard key={lobbyData.lobby_name} lobbyData={lobbyData}/>)}
        </div>
    )   
   
}

export default LobbyList;