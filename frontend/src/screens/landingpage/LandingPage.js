import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '../../components/index';
import './LandingPage.css';
import Logo from '../../assets/logo.png';

const LandingPage = (props) => {
  const { email } = props;
  const isAuthenticated = email !== undefined;
  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <Body isAuthenticated={isAuthenticated} />
    </div>
  );
};

const Header = (props) => {
  const history = useHistory();
  const { isAuthenticated } = props;

  const HeaderButtons = () => {
    if (isAuthenticated) {
      return (
        <div>
          <Button name="Access app" onClick={() => history.push('/dashboard')} />
        </div>
      );
    }
    return (
      <div>
        <Button name="Sign up" onClick={() => history.push('/signup')} />
        <Button name="Login" style={{ marginLeft: '5px' }} onClick={() => history.push('/login')} />
      </div>
    );
  };

  return (
    <div className="header">
      <span className="headerTitle">
        <div className="logoDiv">
          <NavLink to="/">
            <img src={Logo} alt="Job Triage" />
          </NavLink>
        </div>
      </span>
      <HeaderButtons />
    </div>
  );
};

const Body = () => {
  return (
    <div>
      <h1>Job Triage</h1>
      <h2>
        Manage your job applications in a right way
      </h2>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return users;
};

export default connect(mapStateToProps)(LandingPage);
