import React, { useState } from 'react';
import APIService from '../../service/APIService';
import { Button, Input, Typography } from '../../Material-UI/Components';
import { makeStyles } from '../../Material-UI/import';
import {
  useToast, ToastConstants, useAppContext, useLoader,
} from '../../store/context';


const useStyles = makeStyles((theme) => ({
  innerContainer: {
    margin: '6em',
    marginLeft: '5em',
  },
  h2: {
    margin: '0 8px',
  },
  h3: {
    margin: '1em 8px',
  },
  changePassword: {
    marginTop: '2em',
  },
  error: {
    color: theme.palette.error.main,
  },
  passwordForm: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0.5em',
    maxWidth: '40vh',
  },
}));


const getData = (id, name) => {
  APIService.getDataDump(id).then((response) => {
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.pdf`;
    a.click();
  });
};

const ChangePassword = () => {
  const showToast = useToast();
  const showLoader = useLoader();
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const initializeForm = () => {
    setError('');
    setPassword('');
    setCurrentPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password === confirmPassword) {
      showLoader(true);
      APIService.changePassword(currentPassword, password)
        .then(() => {
          showToast('Password updated', ToastConstants.SUCCESS);
          initializeForm();
        })
        .catch(() => showToast('Password mismatch', ToastConstants.ERROR))
        .finally(() => showLoader(false));
    } else {
      setError('Password and confirm password mismatch');
    }
  };

  return (
    <div className={classes.changePassword}>
      <Typography variant="h6" color="primary">
        Change password
      </Typography>
      <form onSubmit={handleSubmit} className={classes.passwordForm}>
        <Input
          type="password"
          label="Current Password"
          required
          onChange={e => setCurrentPassword(e.target.value)}
          value={currentPassword}
        />
        <Input
          type="password"
          label="Password"
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Input
          type="password"
          label="Confirm Password"
          required
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Button name="Update password" type="submit">Update</Button>
        <p className={classes.error}>
          {error}
        </p>
      </form>
    </div>
  );
};


const AccountDetails = () => {
  const classes = useStyles();
  const { state } = useAppContext();
  const { userId: id, email, name } = state.user;

  return (
    <div className={classes.innerContainer}>
      <Typography variant="h6" color="primary">
        Account
      </Typography>
      <Typography variant="body1">
        <b>Email:</b>
        {' '}
        {email}
      </Typography>
      <Typography variant="body1">
        <b>Name:</b>
        {' '}
        {name}
      </Typography>
      <ChangePassword />

      <Button name="Export Data" onClick={() => getData(id, name)}>Export Data</Button>
    </div>
  );
};


export default AccountDetails;
