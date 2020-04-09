import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';

import styles from './SignupPage.module.scss';

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    APIService.signUp(name, email, password)
      .then(() => { window.location = '/dashboard'; })
      .catch(() => setError('Error occurred check inputs'));
  };

  return (
    <div className={styles.SignUpPage}>
      <form className={styles.SignUpForm} onSubmit={handleSubmit}>
        <Input type="text" label="name" onChange={e => setName(e.target.value)} value={name} />
        <Input type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} helperText="Verification mail will be sent" />
        <Input type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} />
        <Input type="password" label="confirm password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
        <Button name="Sign up" type="submit">Sign Up</Button>
        <p className={styles.Anchor}>
          Already have an account?
          <span onClick={() => history.push('/login')}>
            {' '}
            Login here
          </span>
        </p>
        <p className={styles.Error}>
          {error}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
