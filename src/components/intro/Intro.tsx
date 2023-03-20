import React, { useState, useEffect } from "react";
import CreateGameForm from "./CreateGameForm";
import JoinGameForm from "./JoinGameForm";
import { socket } from "../../socket";

interface RoomInterface {
    "room_name": string,
    "curr_players": number,
    "max_players": number,
    "game_length": number,
    "private": boolean,
    "password": string,
    "host": number,
}

/**
 * Show Intro page
 *
 * Props:
 * -
 */

function Intro() {
    const [showForm, setShowForm] = useState(
        {
            visibleForm: '',
            greyOverlay: false
        }
    )

    const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>()

    const [rooms, setRooms] = useState<Array<RoomInterface>>(
        []
    )

    const [loading, setLoading] = useState(false)

    console.log("What is loading?", loading);
    console.log("What is intro form?", showForm);
    console.log("What is rooms?", rooms);

    function updateRooms(msg: any) {
        console.debug("Entered updateRooms function")
        console.log(msg);
        setRooms((prevRooms) => msg);
        setLoading(() => true);
    }


    useEffect(() => {

        function onConnect(msg: string) {
            console.log(msg);
            getRooms();
        }

        function getRooms() {
            socket.emit('intro-get-rooms');
        }

        if (intervalId === undefined) {
            console.debug("Going to set a new interval");
            let id = setInterval(getRooms, 2000);
            setIntervalId(id);
        }

        socket.on('connected', onConnect);
        socket.on('intro-send-rooms', updateRooms);

        return () => {
            socket.off('connected', onConnect);
            socket.off('intro-send-rooms', updateRooms);
            clearInterval(intervalId)
        };
    }, []);

    function showCreateGameForm() {
        setShowForm(
            {
                ...showForm,
                visibleForm: "create"
            }
        )
    }

    function showJoinGameForm() {
        setShowForm(
            {
                ...showForm,
                visibleForm: "join"
            }
        )
    }

    function formCancel() {
        setShowForm(
            {
                ...showForm,
                visibleForm: ""
            }
        )
    }

    let form;

    if (showForm.visibleForm === "create") {
        form = <CreateGameForm cancel={formCancel} />
    }

    if (showForm.visibleForm === "join") {
        form = <JoinGameForm cancel={formCancel} />
    }

    let roomList;

    if (!loading) {
        roomList = <p>Loading...</p>
    } else {
        roomList = rooms.map((room) => <h5 key={room.room_name}>{room.room_name} {room.curr_players}/{room.max_players} Players</h5>)
    }

    return (
        <div className='Intro'>
            <p>INTROROROROROR</p>
            <button onClick={showCreateGameForm}>Create a new game!</button>
            <button onClick={showJoinGameForm}>Join a game!</button>
            {form}
            <div className='Intro-room-container'>
                <h3>
                    Rooms Available...
                </h3>
                {roomList}
            </div>
        </div>
    )
}

export default Intro;