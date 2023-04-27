import React, { useContext } from "react";
import {  Link } from "react-router-dom";
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
                <Link to={"/"}>
                    {playerData.playerName}
                </Link>
        </nav>
    )
}

export default Nav;