import React, {useState} from "react";
import CreateGameForm from "./CreateGameForm";
import JoinGameForm from "./JoinGameForm";
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

    function formCancel(){
        setShowForm(
            {
                ...showForm,
                visibleForm:""
            }
        )
    }

    let form;
    if(showForm.visibleForm==="create"){
        form = <CreateGameForm cancel={formCancel}/>
    }
    if(showForm.visibleForm==="join"){
        form = <JoinGameForm cancel={formCancel}/>
    }
    
    return (
        <div className='Intro'>
            <p>INTROROROROROR</p>
            <button onClick={showCreateGameForm}>Create a new game!</button>
            {form}
        </div>
    )
}

export default Intro;