import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';

const DoneRecipe = ({ data }) => {
  const [copied, setCopied] = useState('');
  const [dataType, setDataType] = useState('All');
  const [dataFilter, setDataFilter] = useState(data);

  const dones = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const saveOnLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const copyLink = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied('Link copiado!');
  };

  const handleFilter = ({ target }) => {
    setDataType(target.name);
  };

  useEffect(() => {
    if (dataType === 'comida') {
      const dataFood = () => {
        setDataFilter(data.filter(({ type }) => type === 'comida'));
      };
      dataFood();
    } else if (dataType === 'bebida') {
      const dataDrink = () => {
        setDataFilter(data.filter(({ type }) => type === 'bebida'));
      };
      dataDrink();
    } else {
      const defaultData = () => {
        setDataFilter(data);
      };
      defaultData();
    }
  }, [data, dataType]);

  const addOrRemoveFavorite = (id) => {
    console.log(dataFilter);
    let doneFil = [];
    doneFil = dones.filter((el) => el.id !== id);
    saveOnLocalStorage('doneRecipes', doneFil);
    setDataFilter(doneFil);
    console.log(dones);
  };

  return (
    <main>
      <div>
        {
          dones.map(({
            name, image, area, category, type, alcoholicOrNot, id, doneDate, tags,
          }, index) => (
            <div key={ type }>
              <Link
                to={ `${type}s/${id}` }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                  width="200"
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {alcoholicOrNot || `${area} - ${category}`}
              </p>
              <Link
                to={ `${type}s/${id}` }
                type="button"
              >
                <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              </Link>

              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

              <p data-testid={ `${index}-Pasta-horizontal-tag` }>Pasta horizontal tag</p>

              {
                tags.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))
              }

              <section className="buttons-container">
                <label htmlFor="share">
                  <input
                    id="share"
                    type="image"
                    alt="Botão compartilhar"
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => copyLink(type, id) }
                  />
                  {copied}
                </label>
                <input
                  onClick={ () => addOrRemoveFavorite(id) }
                  type="image"
                  src={ favoriteIcon }
                  alt="Botão de favoritar"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </section>
            </div>
          ))
        }
        <button
          name="All"
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          name="bebida"
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <button
          name="comida"
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
      </div>
      <div>
        <HeaderWithoutSearch page="Receitas Feitas" />
        Done Recipes
      </div>
    </main>
  );
};

DoneRecipe.propTypes = {
  data: PropTypes.arrayOf.isRequired,
};

export default DoneRecipe;
