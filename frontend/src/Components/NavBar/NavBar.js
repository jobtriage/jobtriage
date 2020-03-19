import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Logo } from '../../assets/icons';
import { List, Divider } from '../../Material-UI/Components';
import ListItemWithLink from '../UI/ListItemWithLink/ListItemWithLink';
import { makeStyles } from '../../Material-UI/import';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1',
    height: '100vh',
    backgroundColor: '#f1f1f1',
    width: '200px',
  },
  logo: {
    margin: theme.spacing(2.5),
    width: '40px',
  },
  textStyle: {
    color: theme.palette.textPrimary.main,
    fontWeight: '500',
  },
  logoDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    marginLeft: '200px',
  },
}));

const NavBar = props => {
  const classes = useStyles();
  const { children } = props;
  return (
    <div>
      <nav className={classes.root}>
        <div className={classes.logoDiv}>
          <NavLink to="/">
            <img src={Logo} alt="logo" className={classes.logo} />
          </NavLink>
        </div>
        <Divider />
        <List component="ul">
          <ListItemWithLink
            primary="Dashboard"
            to="/dashboard"
            textOverrideClass={{ primary: classes.textStyle }}
            icon={<DashboardOutlinedIcon />}
          />
          <ListItemWithLink
            primary="Account"
            to="/account"
            textOverrideClass={{ primary: classes.textStyle }}
            icon={<SettingsOutlinedIcon />}
          />
        </List>
      </nav>
      <div className={classes.container}>
        {children}
      </div>
    </div>

  );
};

export default NavBar;
