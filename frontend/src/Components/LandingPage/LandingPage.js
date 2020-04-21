import React from 'react';
import Header from './Header/Header';
import LandingBody from './LandingBody/LandingBody';
import { useAppContext } from '../../store/context';

const LandingPage = () => {
  const { state } = useAppContext();
  const { email } = state.user;
  const isAuthenticated = email !== undefined;
  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <LandingBody isAuthenticated={isAuthenticated} />
    </div>
  );
};


export default LandingPage;
