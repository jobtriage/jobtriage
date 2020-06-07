import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';
import { useAppContext } from '../../../store/context';
import { NavBar, CircularLoader } from '../../../Components'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  verifyEmail: {
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const VerifyEmail = () => {
  const classes = useStyles();
  const [status, setStatus] = useState('');

  const sendMail = () => {
    APIService.resendVerificationMail().then(resp => {
      const { message } = resp.data;
      setStatus(message);
    });
  };

  const logout = () => {
    APIService.logout()
      .then(() => {
        document.location = '/';
      });
  };

  return (
    <div className={classes.verifyEmail}>
      <Typography variant="h5" color="primary">
        Seems Email address is not verified
      </Typography>
      <div className={classes.buttons}>
        <Button onClick={sendMail}>Resend mail</Button>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Typography variant="h6" color="primary">
        {status}
      </Typography>
    </div>
  );
};

const VerifiedRoute = (props) => {
  const classes = useStyles();
  const { state } = useAppContext();
  const { email, confirmed } = state.user;
  const { children } = props;

  return (
    <div className={classes.root}>
      {email ? 
        <div>
          {confirmed ?  <NavBar> {children} </NavBar> : <VerifyEmail />}
        </div> :  <CircularLoader /> 
      }
    </div>
  );
};

export default VerifiedRoute;
