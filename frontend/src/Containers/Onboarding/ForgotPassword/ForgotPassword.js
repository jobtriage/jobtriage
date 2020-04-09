import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Button } from '../../../Material-UI/Components';
import APIService from '../../../service/APIService';
import { useToast, ToastConstants } from '../../../store/context';


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));


const VerifyOPTForm = ({ email }) => {
  const classes = useStyles();
  const history = useHistory();
  const showToast = useToast();

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOTPSubmit = evt => {
    evt.preventDefault();
    if (password === confirmPassword) {
      APIService.verifyOTP(email, otp, password)
        .then(() => history.push('/login'))
        .catch(err => showToast(err.response.data.message, ToastConstants.ERROR));
    } else {
      showToast('Password mismatch', ToastConstants.ERROR);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleOTPSubmit}>
      <Input type="password" label="otp" onChange={e => setOtp(e.target.value)} value={otp} />
      <Input type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} />
      <Input type="password" label="confirm password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
      <Button name="Update password" type="submit">Update password</Button>
    </form>
  );
};

const ForgotPassword = () => {
  const classes = useStyles();
  const showToast = useToast();

  const [email, setEmail] = useState('');
  const [otpGenerated, setOtpGenerated] = useState(false);

  const handleOTPGenerate = evt => {
    evt.preventDefault();
    APIService.generateOTP(email)
      .then(() => {
        setOtpGenerated(true);
        showToast('OTP sent', ToastConstants.SUCCESS);
      })
      .catch(() => showToast('Email not registered', ToastConstants.ERROR));
  };

  const GenerateOTPForm = () => {
    return (
      <form className={classes.form} onSubmit={handleOTPGenerate}>
        <Input type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} autoFocus />
        <Button name="Send OTP" type="submit">Send OTP</Button>
      </form>
    );
  };

  return (
    <div className={classes.container}>
      {otpGenerated ? <VerifyOPTForm email={email} /> : <GenerateOTPForm />}
    </div>
  );
};

export default ForgotPassword;
