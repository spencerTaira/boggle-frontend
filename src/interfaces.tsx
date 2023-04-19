export interface PlayerDataInterface {
    playerId: number,
    playerName: string,
    currLobby: string
}

export interface IntroLobbyInterface {
    "lobby_name": string,
    "curr_players": number,
    "max_players": number,
    // "game_length": number,
    // "private": boolean,
    // "password": string,
    // "host": number,
}

export interface LobbyInterface {
    "game_length": number,
    "host": number|null,
    "lobby_name": string,
    "max_players": number,
    "private": boolean
}

export interface PlayerMessageInterface {
    playerName: string,
    message: string
}

export interface PlayerInLobbyInterface {
    playerName: string,
    playerId: number
}