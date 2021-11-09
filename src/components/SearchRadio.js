import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import allContext from '../Context/context';

function SearchRadio({ page }) {
  const { hadleRadio, filterPrimary } = useContext(allContext);
  return (
    <header>

      <label htmlFor="ingrediente">
        ingrediente
        <input
          data-testid="ingredient-search-radio"
          id="ingrediente"
          name="select-radio"
          type="radio"
          onClick={ () => hadleRadio('ingrediente') }
        />
      </label>

      <label htmlFor="nome">
        nome
        <input
          data-testid="name-search-radio"
          id="nome"
          name="select-radio"
          type="radio"
          onClick={ () => hadleRadio('nome') }
        />
      </label>

      <label htmlFor="primeira letra">
        primeira letra
        <input
          data-testid="first-letter-search-radio"
          id="primeira letra"
          name="select-radio"
          type="radio"
          onClick={ () => hadleRadio('primeira letra') }
        />
      </label>

      <button
        onClick={ () => filterPrimary(page) }
        type="button"
        data-testid="exec-search-btn"
      >
        buscar

      </button>

    </header>
  );
}

SearchRadio.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchRadio;
