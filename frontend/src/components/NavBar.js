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
    </div>
  );
};

export default NavBar;
