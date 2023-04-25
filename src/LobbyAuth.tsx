import { useContext } from "react";
import userContext from "./userContext";
import { useParams } from "react-router-dom";
import EnterPasswordForm from "./components/lobby/EnterPasswordForm";
import Lobby from "./components/lobby/Lobby";

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

    const { id } = useParams<{ id: string }>();
    const { playerData } = useContext(userContext);

    console.log('Lobby ID', id);
    console.log('playerData', playerData);

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