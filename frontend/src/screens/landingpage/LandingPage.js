import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import APIService from '../../service/APIService';
import { Button } from '../../components/index';
import './LandingPage.css';

const LandingPage = ({ dispatch }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    APIService.isLoggedIn().then(resp => {
      const { user_id: userId, email } = resp.data.message;
      dispatch(addUser(userId, email));
      setIsAuthenticated(true);
    }).catch(console.log);
  }, []);

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
      <span className="headerTitle">Job Triage</span>
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

export default connect()(LandingPage);
