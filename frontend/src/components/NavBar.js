import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className='nav-bar'>
      <NavLink
        exact
        to='/sentiment'
        className='nav-link'
        activeClassName='active-nav-link'
      >
        <div>Sentiment Analysis</div>
      </NavLink>
      <NavLink
        to='/hnsearch'
        className='nav-link'
        activeClassName='active-nav-link'
      >
        <div>Hacker News Search</div>
      </NavLink>
      <NavLink
        to='/hnleaderboards'
        className='nav-link'
        activeClassName='active-nav-link'
      >
        <div>Hacker News Leaderboards</div>
      </NavLink>
    </div>
  );
};

export default NavBar;
