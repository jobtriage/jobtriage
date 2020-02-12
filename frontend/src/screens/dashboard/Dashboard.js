import React from 'react';
import { NavBar } from '../../container';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <NavBar />
      <div className="container">
        <h2>Dashboard</h2>
      </div>
    </div>
  );
}
