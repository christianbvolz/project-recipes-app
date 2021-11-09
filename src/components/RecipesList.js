import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import allContext from '../Context/context';

export default function RecipesList({ page }) {
  const { recipes } = useContext(allContext);
  const history = useHistory();

  const type = (page === 'Comidas') ? 'meals' : 'drinks';
  const name = (page === 'Comidas') ? 'strMeal' : 'strDrink';
  const thumb = (page === 'Comidas') ? 'strMealThumb' : 'strDrinkThumb';
  const idRecipe = (page === 'Comidas') ? 'idMeal' : 'idDrink';
  const MaxRecipes = 12;
  const alert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const mapRecipes = () => {
    const id = recipes[type][0][idRecipe];
    if (recipes[type].length === 1) history.push(`/${page.toLowerCase()}/${id}`);
    return (
      <div>
        {recipes[type].slice(0, MaxRecipes).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
            <p data-testid={ `${index}-card-name` }>{ recipe[name] }</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe[thumb] }
              alt={ recipe[name] }
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      { (Object.keys(recipes).length > 0) && recipes[type] !== null
      && mapRecipes()}
      { global.alert(alert) }
    </div>
  );
}

RecipesList.propTypes = {
  page: PropTypes.string.isRequired,
};
