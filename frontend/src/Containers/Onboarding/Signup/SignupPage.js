import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../../../Components';
import APIService from '../../../service/APIService';
import './SignupPage.css';

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
      .then(() => history.push('/dashboard'))
      .catch(() => setError('Error occurred check inputs'));
  };

  return (
    <div className="signupPage">
      <form className="signupForm" onSubmit={handleSubmit}>
        <Input type="text" label="name" onChange={e => setName(e.target.value)} value={name} />
        <Input type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} />
        <Input type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} />
        <Input type="password" label="confirm password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
        <Button name="Sign up" type="submit" style={{ marginTop: '5px', marginBottom: '5px' }} />
        <p>
          Already have an account?
          <span onClick={() => history.push('/login')} className="anchor">
            {' '}
            Login here
          </span>
        </p>
        <p className="error">
          {error}
        </p>
      </form>
    </div>
  );
}
export default SignUp;
