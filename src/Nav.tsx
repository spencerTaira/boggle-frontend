import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "./userContext";

function Nav() {
    const { playerData } = useContext(userContext);

    // Temp function clearing functionality to help with testing
    function clearStorage() {
        localStorage.clear();
        sessionStorage.clear();
    }

    return (
        <nav className="Nav">
           <Link to={"/"}>
                Home
            </Link>
            <button onClick={clearStorage}>
                Clear
            </button>
            <p>{playerData.playerName}</p>
        </nav>
    )
}

export default Nav;