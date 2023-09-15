import { PlayerInLobbyInterface } from "../../../interfaces";
import PlayerCard
 from "./PlayerCard";
/**
 * Renders Player in current lobby and keep placeholder spots for empty slots
 *
 * State:
 *  N/A
 *
 * Props:
 *  players: [{
        playerName: string,
        playerId: number
    }, ...]

 *  maxPlayers: integer
 *
 *  Render:
 *      Lobby -> PlayerCards -> PlayerCard
 */
function PlayerCards(
    {players, maxPlayers}: {players:Array<PlayerInLobbyInterface>, maxPlayers:number}
) {
    console.debug('PlayerCards');

    const numPlayers = players.length;
    const playerNames:Array<String> = players.map(player => player.playerName);

    const emptyPlayers:number = maxPlayers - numPlayers ;
    const fillPlayers:Array<String> = Array(emptyPlayers).fill('placeholder');
    const totalPlayerList = playerNames.concat(fillPlayers);

    return (
        <div className='PlayerCards'>
            {totalPlayerList.map((player, i) => {
                return <PlayerCard name={player} key={i}/>
            })}
        </div>
    )
}

export default PlayerCards;