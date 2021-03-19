import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({ click }) => {
  return (
    <nav className="navbar">
      {/* logo */}
      <div className="navbar__logo">
        <h2>Maccabi</h2>
      </div>

      {/* links */}
      <ul className="navbar__links">
        <li>
          <NavLink to="/users" className="users__link" activeClassName="active">
            Users Screen
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className="users__link"
            activeClassName="active"
            exact
          >
            Registration Screen
          </NavLink>
        </li>
      </ul>

      {/* hamburger menu */}
      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
