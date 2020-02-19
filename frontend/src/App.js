import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import APIService from './service/APIService';
import { addUser } from './actions';
import LandingPage from './screens/landingpage/LandingPage';
import Login from './screens/auth/LoginPage';
import Signup from './screens/auth/SignupPage';
import Dashboard from './screens/dashboard/Dashboard';
import Account from './screens/account/Account';
import './App.css';


function App({ dispatch }) {
  useEffect(() => {
    APIService.isLoggedIn().then(resp => {
      const { user_id: userId, email, name } = resp.data.message;
      dispatch(addUser(userId, email, name));
    }).catch(console.log);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
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
            <Account />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default connect()(App);
