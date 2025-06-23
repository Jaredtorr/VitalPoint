import React from "react";
import './Header.css'

function Header() {
    return (
        <>
        <header className="navbar">
        <div className="left-section">
            <img src="logo.png" alt="logo" className="logo" />
        </div>
        <h1 className="title-navbar">InnovaTech</h1>
        </header>
        </>
    )
}

export default Header;