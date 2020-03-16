import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../Components';
import { Logo } from '../../../assets/icons';

import styles from './Header.module.scss';

const Header = (props) => {
    const history = useHistory();
    const { isAuthenticated } = props;

    const HeaderButtons = () => {
        if (isAuthenticated) {
            return (
                <div>
                    <Button onClick={() => history.push('/dashboard')}>Access App</Button>
                </div>
            );
        }
        return (
            <div>
                <Button onClick={() => history.push('/signup')}>Sign Up</Button>
                <Button onClick={() => history.push('/login')}>Login</Button>
            </div>
        );
    };

    return (
        <div className={styles.Header}>
            <img src={Logo} alt="Job Triage" />
            <HeaderButtons />
        </div>
    );
};

export default Header;
