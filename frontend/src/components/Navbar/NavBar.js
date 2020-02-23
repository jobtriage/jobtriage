import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../../assets/icons';

import './NavBar.css';

const NavBar = (props) => {
  return (
    <div className="navBar" {...props}>
      <div className="logoDiv">
        <NavLink to="/">
          <img src={Logo} alt="Job Triage" />
        </NavLink>
      </div>
      <ul>
        <li><NavLink to="/dashboard">Application</NavLink></li>
        {/* <li><NavLink to="/self">Self Analysis</NavLink></li> */}
        <li><NavLink to="/account">Account</NavLink></li>
      </ul>
    </div>
  );
};

export default NavBar;
