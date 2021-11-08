import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

const Header = ({ page }) => {
  const [searchBar, showSearchbar] = useState(false);

  if (searchBar) {
    return (
      <header>
        <Link to="/perfil">
          <img src={ profileIcon } alt="searchIcon" data-testid="profile-top-btn" />
        </Link>
        <h3 data-testid="page-title">{page}</h3>
        <button onClick={ () => showSearchbar(false) } type="button">
          <img
            src={ SearchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
          />
        </button>
        <label htmlFor="searchBar">
          <input data-testid="search-input" />
        </label>
      </header>
    );
  }

  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="searchIcon" data-testid="profile-top-btn" />
      </Link>
      <h3 data-testid="page-title">{page}</h3>
      <button onClick={ () => showSearchbar(true) } type="button">
        <img
          src={ SearchIcon }
          alt="searchIcon"
          data-testid="search-top-btn"
        />
      </button>
    </header>
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Header;
