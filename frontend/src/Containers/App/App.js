import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import APIService from '../../service/APIService';
import { addUser } from '../../store/actions';
import LandingPage from '../../Components/LandingPage/LandingPage';
import AccountDetails from '../../Components/AccountDetails/AccountDetails';
import Login from '../Onboarding/Login/LoginPage';
import Signup from '../Onboarding/Signup/SignupPage';
import VerifiedRoute from '../Onboarding/VerifiedRoute/VerifiedRoute';
import Dashboard from '../Dashboard/Dashboard';
import ViewJob from '../ViewJob/ViewJob';
import { Toast } from '../../Material-UI/Components';
import { useAppContext } from '../../store/context';
import styles from './App.module.scss';

const App = ({ addUserInitially }) => {
  useEffect(() => {
    APIService.isLoggedIn().then(resp => {
      const {
        user_id: userId, email, name, email_confirmed: confirmed,
      } = resp.data.message;
      addUserInitially({
        userId, email, name, confirmed,
      });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }, [addUserInitially]);

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

const Routes = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={VerifiedDashboard} />
          <Route path="/account" component={VerifiedAccountDetails} />
          <Route path="/application/:applicationId" component={ViewJob} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUserInitially: (userDetails) => dispatch(addUser(userDetails)),
  };
};

export default connect(null, mapDispatchToProps)(App);
