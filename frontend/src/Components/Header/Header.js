import React from 'react';
import { Button } from '../index';
import { useHistory, NavLink } from 'react-router-dom';
import { Logo } from '../../assets/icons';

import './Header.css';

const Header = (props) => {
    const history = useHistory();
    const { isAuthenticated } = props;

    const HeaderButtons = () => {
        if (isAuthenticated) {
            return (
                <div>
                    <Button name="Access app" onClick={() => history.push('/dashboard')} />
                </div>
            );
        }
        return (
            <div>
                <Button name="Sign up" onClick={() => history.push('/signup')} />
                <Button name="Login" style={{ marginLeft: '5px' }} onClick={() => history.push('/login')} />
            </div>
        );
    };

    return (
        <div className="header">
            <span className="headerTitle">
                <div className="logoDiv">
                    <NavLink to="/">
                        <img src={Logo} alt="Job Triage" />
                    </NavLink>
                </div>
            </span>
            <HeaderButtons />
        </div>
    );
};

export default Header;