import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, AppBar } from '../../../Components';
import { makeStyles } from '../../../Material-UI/import';
import { Logo } from '../../../assets/icons';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '1vh 4vw',
        backgroundColor: 'white'
    },
    logo: {
        width: '50px'
    }
}))

const Header = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { isAuthenticated } = props;

    const HeaderButtons = () => {
        if (isAuthenticated) {
            return <Button onClick={() => history.push('/dashboard')}>Access App</Button>
        }
        return (
            <div>
                <Button onClick={() => history.push('/signup')}>Sign Up</Button>
                <Button onClick={() => history.push('/login')}>Login</Button>
            </div>
        );
    };

    return (
        <AppBar position='sticky' className={classes.root}>
            <img src={Logo} alt="Job Triage" className={classes.logo} />
            <HeaderButtons />
        </AppBar>
    );
};

export default Header;
