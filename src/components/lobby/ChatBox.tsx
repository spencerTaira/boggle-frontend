import { socketLobby } from "../../socket";
import { useState, useContext } from "react";

import { PlayerMessageInterface } from "../../interfaces";
import userContext from "../../userContext";

function ChatBox(
    {
        messagesData,
        appendMessage
    }
    :
    {
        messagesData:Array<PlayerMessageInterface>,
        appendMessage:Function
    })
{
    console.debug('Entered ChatBox');
    
    const { playerName } = useContext(userContext)
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
        //TODO: playerName not showing in messageData, possibly context??
        const newMessage = {playerName:playerName, message:formData.message}
        appendMessage(newMessage)
        setFormData(()=>({message:''}))
    }
    // messagesData.map((msgData, idx:number)=>
    //     (<p key={idx}>{msgData.playerName}, {msgData.message}</p>)
    // )
    return (
        <div className="ChatBox">
            <div className="ChatBox-messages">
                {messagesData.map(
                    (msg, idx)=><p key={idx}>{msg.message}</p>
                )}
            </div>
            <form onSubmit={handleSubmit}>
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