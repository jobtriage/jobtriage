import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Button, Typography } from '../../../Material-UI/Components';
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
  formContainer: {
    border: '1px solid #dedede',
    padding: '15px 30px',
    boxShadow: '1px 1px 6px #cacaca',
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
      <Input type="password" label="otp" onChange={e => setOtp(e.target.value)} value={otp} required />
      <Input type="password" label="password" onChange={e => setPassword(e.target.value)} value={password} required />
      <Input type="password" label="confirm password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} required />
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
        <Input type="text" label="email" onChange={e => setEmail(e.target.value)} value={email} autoFocus required />
        <Button name="Send OTP" type="submit">Send OTP</Button>
      </form>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography color="primary" variant="h5">
            Forgot Password
          </Typography>
        </div>
        {otpGenerated ? <VerifyOPTForm email={email} /> : <GenerateOTPForm />}
      </div>
    </div>
  );
};

export default ForgotPassword;
