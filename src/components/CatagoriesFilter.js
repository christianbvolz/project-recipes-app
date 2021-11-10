import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import allContext from '../Context/context';

export default function CategoriesFilter({ page }) {
  const { mealsCategories, drinksCategories } = useContext(allContext);

  const getRecipesByCategory = async (categoryName) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const responseJson = await response.json();
    return responseJson;
  };

  const MaxCategories = 5;
  const categories = (page === 'Comidas') ? mealsCategories : drinksCategories;
  const type = (page === 'Comidas') ? 'meals' : 'drinks';
  console.log(categories);
  return (
    <div>
      { (Object.keys(categories).length > 0) && categories[type] !== null
      && categories[type].slice(0, MaxCategories).map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          type="button"
          key={ strCategory }
          onClick={ () => getRecipesByCategory(strCategory) }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

CategoriesFilter.propTypes = {
  page: PropTypes.string.isRequired,
};
