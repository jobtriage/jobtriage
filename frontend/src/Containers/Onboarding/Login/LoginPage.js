import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../../../Components';
import APIService from '../../../service/APIService';

import styles from './LoginPage.module.scss';

const Login = () => {
  const history = useHistory();
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
    <div className={styles.LoginPage}>
      <form className={styles.LoginForm} onSubmit={handleSubmit}>
        <Input type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} required />
        <Input type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} required />
        <Button name="Login" type="submit">Login</Button>
        <p className={styles.Anchor}>
          Don&apos;t have an account?
          <span onClick={() => history.push('/signup')} >
            {' '}
            Sign up here
          </span>
        </p>
        <p className={styles.Error}>
          {error}
        </p>
      </form>
    </div>
  );
};

export default Login;
