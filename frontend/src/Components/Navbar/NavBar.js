import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../../assets/icons';

import styles from './NavBar.module.scss';

const NavBar = (props) => {
  return (
    <div className={styles.NavBar} {...props}>
      <div className={styles.LogoDiv}>
        <NavLink to="/">
          <img src={Logo} alt="Job Triage" />
        </NavLink>
      </div>
      <ul>
        <li><NavLink activeClassName={styles.ActiveClass} to="/dashboard">Application</NavLink></li>
        {/* <li><NavLink to="/self">Self Analysis</NavLink></li> */}
        <li><NavLink activeClassName={styles.ActiveClass} to="/account">Account</NavLink></li>
      </ul>
    </div>
  );
};

export default NavBar;
