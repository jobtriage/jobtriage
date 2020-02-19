import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../../container';
import './Account.css';

function Account(props) {
  const { email, name } = props;
  return (
    <div className="account">
      <NavBar />
      <div className="container">
        <h2>Account</h2>
        <h3>
          Email :
          {email}
        </h3>
        <h3>
          Name :
          {name}
        </h3>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { users } = state;
  return users;
};

export default connect(mapStateToProps)(Account);
