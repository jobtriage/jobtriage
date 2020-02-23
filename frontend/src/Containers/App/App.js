import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import APIService from '../../service/APIService';
import { addUser } from '../../store/actions';
import LandingPage from '../LandingPage/LandingPage';
import Login from '../Onboarding/Login/LoginPage';
import Signup from '../Onboarding/Signup/SignupPage';
import Dashboard from '../Dashboard/Dashboard';
import { AccountDetails } from '../../Components/index';

import './App.css';

const App = ({ dispatch }) => {

  useEffect(() => {
    APIService.isLoggedIn().then(resp => {
      const { user_id: userId, email, name } = resp.data.message;
      dispatch(addUser(userId, email, name));
    }).catch(console.log);
  }, [dispatch]);

  return <Routes />
}

const Routes = () => {
  return (
    <Router>
      <div className="app">
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

export default App;
