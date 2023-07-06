import React from "react";
import { Link } from "react-router-dom";
import logo from '../logo.svg';

const NavbarComponent = () => {
    return (
        <React.Fragment>
            <header className='App-header'>
            <div className='logo'>
              <a href="/"><img src={logo} className="headerIcon" alt="logo" /></a>
            </div>
              <nav className='App-navbar'>
                <ul>  
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="#">Contact</Link>
                  </li>
                  <li>
                    <Link to="#">Support</Link>
                  </li>
                </ul>
              </nav>
            </header>
        </React.Fragment>
    );
}

export default NavbarComponent;