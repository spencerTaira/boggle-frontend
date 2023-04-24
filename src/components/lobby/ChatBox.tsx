// interface PlayerMessageInterface {
//     playerName: string,
//     message: string
// }
import { PlayerMessageInterface } from "../../interfaces";

function ChatBox({messagesData}:{messagesData:Array<PlayerMessageInterface>}){

    // messagesData.map((msgData, idx:number)=>
    //     (<p key={idx}>{msgData.playerName}, {msgData.message}</p>)
    // )
    return (
        <div>
            <form>
                <textarea name="messages">
                    {
                        'Hello'
                    }
                </textarea>
            </form>
        </div>
    )
}

export default ChatBox;