import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Button, Typography } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';
import { useLoader } from '../../../store/context';


const useStyles = makeStyles((theme) => ({
  signUpPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  signUpForm: {
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

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const showLoader = useLoader();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError('Password and Confirm password is not same');
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Enter a valid email');
      return false;
    }

    return true;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (validateForm()) {
      showLoader(true);
      APIService.signUp(name, email, password)
        .then(() => { window.location = '/dashboard'; })
        .catch(() => setError('Error occurred check inputs'))
        .finally(() => showLoader(false));
    }
  };

  return (
    <div className={classes.signUpPage}>
      <div className={classes.formContainer}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography color="primary" variant="h5">
            Job Triage
          </Typography>
        </div>
        <form className={classes.signUpForm} onSubmit={handleSubmit}>
          <Input required type="text" label="name" onChange={e => setName(e.target.value)} value={name} />
          <Input required type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} helperText="Verification mail will be sent" />
          <Input required type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} />
          <Input required type="password" label="confirm password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
          <Button name="Sign up" type="submit">Sign Up</Button>
          <p className={classes.anchor}>
            Already have an account?
            <span onClick={() => history.push('/login')} className={classes.span}>
              {' '}
              Login here
            </span>
          </p>
          <p className={classes.error}>
            {error}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
