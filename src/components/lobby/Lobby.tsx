import React from "react";
import EnterPlayerDataForm from "./EnterPlayerDataForm";
import { useParams } from "react-router-dom";

function Lobby() {
    const {id} = useParams<{id: string}>()
    return (
        <div>
            <p>LOBBBBBY: {id}</p>
            <EnterPlayerDataForm roomId={id!}/>
        </div>
    )
}

export default Lobby;