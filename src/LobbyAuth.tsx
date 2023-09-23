import { useContext } from "react";
import userContext from "./userContext";
import { useParams } from "react-router-dom";
import EnterPasswordForm from "./components/lobby/EnterPasswordForm";
import Lobby from "./components/lobby/Lobby";
import BoggleApi from './api'
import { useNavigate } from 'react-router-dom';


/**
 * Renders lobby authentication
 *
 *  State:
 *
 *  Props:
 *
 *  Render:
 *      App -> LobbyAuth -> Lobby / EnterPasswordForm
 */
function LobbyAuth() {
    console.debug('Lobby Auth');
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();
    const { playerData } = useContext(userContext);
    
    console.log('Lobby ID', id);
    console.log('playerData', playerData);

    async function checkLobby(){
        const result = await BoggleApi.checkLobby(id)
        if (result.error){
            navigate('/', {state: {error:result.error}})
        }
    }
    
    checkLobby()
    
    return (
        <div className="LobbyAuth">
            {
                playerData.currLobby === id
                    ? <Lobby />
                    : <EnterPasswordForm id={id!} />
            }
        </div>
    );

}

export default LobbyAuth;