import React from "react";
import { NavLink, Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="Nav">
           <Link to={"/"}>
                Home
            </Link>
        </nav>
    )
}

export default Nav;