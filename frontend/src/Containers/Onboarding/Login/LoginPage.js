import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Button, Typography } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';


const useStyles = makeStyles((theme) => ({
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    color: 'rgb(201, 58, 58)',
    margin: '8px',
    alignSelf: 'center',
  },
  anchor: {
    margin: '8px',
  },
  span: {
    color: `${theme.palette.primary.main}`,
    cursor: 'pointer',
  },
  formContainer: {
    border: '1px solid #dedede',
    padding: '15px 30px',
    boxShadow: '1px 1px 6px #cacaca',
  },
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    APIService.login(email, password)
      .then(() => { window.location = '/dashboard'; })
      .catch(() => setError('Authentication failed check input'));
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.formContainer}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography color="primary" variant="h5">
            Job Triage
          </Typography>
        </div>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <Input type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} required />
          <Input type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} required />
          <Button name="Login" type="submit">Login</Button>
          <p className={classes.anchor}>
            Don&apos;t have an account?
            <span onClick={() => history.push('/signup')} className={classes.span}>
              {' '}
              Sign up here
            </span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p className={classes.anchor}>
              <span onClick={() => history.push('/forgot')} className={classes.span}>
                {' '}
                Forgot password?
              </span>
            </p>
          </div>
          <p className={classes.error}>
            {error}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
