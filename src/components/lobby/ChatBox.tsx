interface PlayerMessageInterface {
    playerName: string,
    message: string
}

function ChatBox({messages}:{messages:Array<PlayerMessageInterface>}){

    return (
        <div>
            {messages.map((msg, idx:number)=><p key={idx}>{msg.playerName}, {msg.message}</p>)}
        </div>
    )
}

export default ChatBox;