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
import Dashboard from '../Dashboard/Dashboard';


import styles from './App.module.scss';

const App = ({ addUserInitially }) => {
  useEffect(() => {
    APIService.isLoggedIn().then(resp => {
      const { user_id: userId, email, name } = resp.data.message;
      addUserInitially({ userId, email, name });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }, [addUserInitially]);

  return <Routes />;
};

const Routes = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/account">
            <AccountDetails />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
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
