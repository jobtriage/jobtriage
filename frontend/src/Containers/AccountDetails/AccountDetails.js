import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../../Components';
import APIService from '../../service/APIService';
import Button from '../../Material-UI/Components/Button/Button';

import './AccountDetails.css';

const AccountDetails = (props) => {
  const { email, name } = props;
  const logout = () => {
    APIService.logout()
      .then(() => {
        document.location = '/';
      })
      .catch(console.log);
  };

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
        <Button name="Logout" onClick={logout} style={{ marginTop: '20px' }} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return users;
};

export default connect(mapStateToProps)(AccountDetails);
