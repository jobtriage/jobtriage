import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import APIService from '../../service/APIService';
import AccountDetails from '../../Components/AccountDetails/AccountDetails';
import Login from '../Onboarding/Login/LoginPage';
import Signup from '../Onboarding/Signup/SignupPage';
import ForgotPassword from '../Onboarding/ForgotPassword/ForgotPassword';
import VerifiedRoute from '../Onboarding/VerifiedRoute/VerifiedRoute';
import Dashboard from '../Dashboard/Dashboard';
import ViewJob from '../ViewJob/ViewJob';
import SelfAnalysis from '../SelfAnalysis/SelfAnalysis';
import { Toast } from '../../Material-UI/Components';
import { useAppContext, useUser } from '../../store/context';


const useStyles = makeStyles(() => ({
  app: {
    fontSize: '16px',
    color: 'rgb(127, 127, 127)',
    height: '100vh',
  },
  progress: {
    position: 'fixed',
    width: '100%',
    zIndex: '10',
  },
}));


const App = () => {
  const addUserHook = useUser();

  useEffect(() => {
    APIService.isLoggedIn().then(resp => {
      const {
        user_id: userId, email, name, email_confirmed: confirmed,
      } = resp.data.message;
      addUserHook(userId, email, name, confirmed);
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }, []);

  const { state, closeToast } = useAppContext();
  return (
    <div>
      <Routes />
      <Toast
        show={state.toast.show}
        message={state.toast.message}
        type={state.toast.type}
        onClose={() => closeToast()}
      />
    </div>
  );
};

const VerifiedDashboard = () => (
  <VerifiedRoute>
    <Dashboard />
  </VerifiedRoute>
);

const VerifiedAccountDetails = () => (
  <VerifiedRoute>
    <AccountDetails />
  </VerifiedRoute>
);

const VerifiedSelfAnalysis = () => (
  <VerifiedRoute>
    <SelfAnalysis />
  </VerifiedRoute>
);

const Routes = () => {
  const classes = useStyles();
  const { state } = useAppContext();

  return (
    <Router>
      <div className={classes.app}>
        {state.loader ? <LinearProgress color="primary" className={classes.progress} /> : ''}
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/dashboard" component={VerifiedDashboard} />
          <Route path="/self" component={VerifiedSelfAnalysis} />
          <Route path="/account" component={VerifiedAccountDetails} />
          <Route path="/application/:applicationId" component={ViewJob} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
