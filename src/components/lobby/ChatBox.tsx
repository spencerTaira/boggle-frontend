// import { socketLobby } from "../../socket";
import { useState, useContext } from "react";

import { PlayerMessageInterface } from "../../interfaces";
import userContext from "../../userContext";

import './ChatBox.css'
import { Socket } from "socket.io-client";

function ChatBox(
    {
        messagesData, socketLobby
        // appendMessage
    }
    :
    {
        messagesData:Array<PlayerMessageInterface>,
        socketLobby:Socket
        // appendMessage:Function
    })
{
    console.debug('Entered ChatBox');
    
    const { playerData } = useContext(userContext)
    const playerName = playerData.playerName;
    const currLobby = playerData.currLobby;
    
    const [formData, setFormData] = useState(
        {
            message:''
        }
    )
    console.log("formdata??", formData)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newMessage = {
            playerName:playerName, 
            message:formData.message
        }
        socketLobby.emit("chat", newMessage, currLobby);
        setFormData(()=>({message:''}));
    }
    
    return (
        <div className="ChatBox">
            <div className="ChatBox-messages">
                {messagesData.map(
                    (msg, idx)=><p key={idx}>{msg.playerName}: {msg.message}</p>
                )}
            </div>
            <form 
                className="ChatBox-message-form"
                onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="ChatBox-text-input"
                    value={formData.message}
                    name="message"
                    onChange={handleChange}
                />
                <button>Send</button>
            </form>
        </div>
    )
}

export default ChatBox;