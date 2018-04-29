import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) => (
  <NavLink
    exact
    className='fluid ui circular button'
    to={filter === 'all' ? '/' : `/${filter}`}
    activeClassName='teal'
  >
    {children}
  </NavLink>
);

export default FilterLink;
