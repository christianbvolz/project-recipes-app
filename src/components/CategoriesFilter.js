import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import allContext from '../Context/context';
import { getRecipesByCategory,
  fetchApiAllMealsRecipes,
  fetchApiAllDrinksRecipes } from '../services/fetchApi';

export default function CategoriesFilter({ page }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previousRecipes, setPreviousRecipes] = useState({});

  const { recipesMeals,
    recipesDrinks,
    mealsCategories,
    drinksCategories,
    setRecipesDrinks,
    setRecipesMeals } = useContext(allContext);
  const MaxCategories = 5;
  const type = (page === 'Comidas') ? 'meals' : 'drinks';
  const setRecipes = ((page === 'Comidas') ? setRecipesMeals : setRecipesDrinks);
  const allCategories = (page === 'Comidas') ? mealsCategories : drinksCategories;

  const categories = (Object.keys(allCategories).length > 0
    && allCategories[type] !== null)
    ? allCategories[type].slice(0, MaxCategories) : [];

  const setRecipesByCategory = async (strCategory) => {
    const recipesByCategory = await getRecipesByCategory(strCategory, page);
    if (selectedCategory === strCategory) {
      setRecipes(previousRecipes);
      setSelectedCategory('');
    } else {
      const recipes = (page === 'Comidas') ? recipesMeals : recipesDrinks;
      setSelectedCategory(strCategory);
      setPreviousRecipes(recipes);
      setRecipes(recipesByCategory);
    }
  };

  const setAllRecipes = async () => {
    if (page === 'Comidas') setRecipes(await fetchApiAllMealsRecipes());
    if (page === 'Bebidas') setRecipes(await fetchApiAllDrinksRecipes());
  };

  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ setAllRecipes }
      >
        All
      </button>
      { categories.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          type="button"
          key={ strCategory }
          onClick={ () => setRecipesByCategory(strCategory) }
        >
          { strCategory }
        </button>
      )) }
    </div>
  );
}

CategoriesFilter.propTypes = {
  page: PropTypes.string.isRequired,
};
