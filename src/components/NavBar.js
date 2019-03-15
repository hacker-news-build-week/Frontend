import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../actions/actions';

export const NavBar = ({ logOut, history }) => {
  const submitLogout = () => {
    logOut();
    history.push('/loginsignup');
  };

  return (
    <div className='nav-bar'>
      <NavLink
        exact
        to='/'
        className='nav-link'
        activeClassName='active-nav-link'
      >
        <div>Sentiment Analysis</div>
      </NavLink>
      <NavLink
        to='/hnanalysis'
        className='nav-link'
        activeClassName='active-nav-link'
      >
        <div>HN Comment Analysis</div>
      </NavLink>
      <NavLink
        to='/hnleaderboards'
        className='nav-link'
        activeClassName='active-nav-link'
      >
        <div>HN Leaderboards</div>
      </NavLink>
      <div onClick={submitLogout}>Logout</div>
    </div>
  );
};

export default connect(
  null,
  { logOut }
)(NavBar);
