import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import LandingBody from './LandingBody/LandingBody';

const LandingPage = (props) => {
  const { email } = props;
  const isAuthenticated = email !== undefined;
  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <LandingBody isAuthenticated={isAuthenticated} />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return users;
};

export default connect(mapStateToProps)(LandingPage);
