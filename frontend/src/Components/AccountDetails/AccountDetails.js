import React from 'react';
import { connect } from 'react-redux';
import { NavBar, Button } from '..';
import APIService from '../../service/APIService';


import styles from './AccountDetails.module.scss';

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
    <div className={styles.Account}>
      <NavBar />
      <div className={styles.InnerContainer}>
        <h2>Account</h2>
        <h3>
          Email:
          {' '}
          {email}
        </h3>
        <h3>
          Name:
          {' '}
          {name}
        </h3>
        <Button onClick={logout}>LogOut</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { users } = state;
  return users;
};

export default connect(mapStateToProps)(AccountDetails);
