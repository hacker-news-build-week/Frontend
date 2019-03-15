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
      <h1 className='title'>Saltiest Hacker News Trolls</h1>
      <h2 className='subtitle'>Sentiment Analysis</h2>
      <div className='nav-div'>
        <div className='nav-link-div'>
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
            <div>HN User Analysis</div>
          </NavLink>
          <NavLink
            to='/hnleaderboards'
            className='nav-link'
            activeClassName='active-nav-link'
          >
            <div>HN Leaderboards</div>
          </NavLink>
        </div>
        <div onClick={submitLogout} className='nav-link'>
          Logout
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { logOut }
)(NavBar);
