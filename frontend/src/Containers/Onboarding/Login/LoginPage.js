import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../../../Components';
import APIService from '../../../service/APIService';

import './LoginPage.css';

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
    <div className="loginPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <Input type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} required />
        <Input type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} />
        <Button name="Login" type="submit" style={{ marginTop: '5px', marginBottom: '5px' }} />
        <p>
          Don&apos;t have an account?
          <span onClick={() => history.push('/signup')} className="anchor">
            {' '}
            Sign up here
          </span>
        </p>
        <p className="error">
          {error}
        </p>
      </form>
    </div>
  );
};

export default Login;
