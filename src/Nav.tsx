import React from "react";
import { NavLink, Link } from "react-router-dom";

function Nav() {

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
        </nav>
    )
}

export default Nav;