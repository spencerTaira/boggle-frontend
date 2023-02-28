import React, {useState} from "react";
import CreateGameForm from "./CreateGameForm";
/**
 * Show Intro page
 *
 * Props:
 * -
 */

function Intro() {
    const [showForm, setShowForm] = useState(
        {
            visibleForm:'',
            greyOverlay:false
        }
    )
    
    function showCreateGameForm(){
        setShowForm(
            {
                ...showForm,
                visibleForm:"create"
            }
        )
    }

    function showJoinGameForm(){

    }
    
    if(showForm.visibleForm==="create"){
        return(
            <div>
                <CreateGameForm />
            </div>
        )
    }
    
    return (
        <div className='Intro'>
            <p>INTROROROROROR</p>
            <button onClick={showCreateGameForm}>Create a new game!</button>
            {/* {showForm.visibleForm==='create'}
            <CreateGameForm /> */}
        </div>
    )
}

export default Intro;