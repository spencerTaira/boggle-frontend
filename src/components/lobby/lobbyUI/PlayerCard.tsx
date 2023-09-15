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
function PlayerCard(
    {name}: {name: String}
) {
    console.debug('PlayerCard');
    
    return (
        <div className='PlayerCard'>
            {name}
        </div>
    )
}

export default PlayerCard;