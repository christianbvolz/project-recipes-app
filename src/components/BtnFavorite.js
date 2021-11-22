import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { GetLocalStorage, SetLocalStorage } from '../services/LocalStorageUser';

function BtnFavorite({ drink, meal, id, type, name, image, existFavorite }) {
  const [Mealfavorite, setMealFavorite] = useState(false);
  const recipesFavorites = GetLocalStorage('favoriteRecipes');
  const typeObjeto = drink === undefined ? meal : drink;

  const areaRecipe = drink === undefined ? 'strArea' : '';

  const area = typeObjeto[areaRecipe] !== undefined ? typeObjeto[areaRecipe] : '';

  const category = typeObjeto.strCategory !== undefined
    ? typeObjeto.strCategory : '';

  const alcoholic = drink !== undefined && typeObjeto.strAlcoholic
    ? typeObjeto.strAlcoholic : '';

  const recipe = {
    id: typeObjeto[id],
    type,
    area,
    category,
    alcoholicOrNot: alcoholic,
    name,
    image,
  };

  const favorite = () => {
    if (Mealfavorite) {
      const remove1Recipe = recipesFavorites.filter((el) => el.id !== typeObjeto[id]);
      SetLocalStorage('favoriteRecipes', remove1Recipe);
      setMealFavorite(false);
    } else {
      const newObject = [...recipesFavorites, recipe];
      SetLocalStorage('favoriteRecipes', newObject);
      setMealFavorite(true);
    }
  };

  useEffect(() => {
    setMealFavorite(existFavorite);
  }, [existFavorite]);

  return (
    <button onClick={ favorite } type="button">
      <img
        data-testid="favorite-btn"
        src={ Mealfavorite ? blackHeart : whiteHeart }
        alt="favorite"
      />
    </button>
  );
}

BtnFavorite.propTypes = {
  existFavorite: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  meal: PropTypes.objectOf(PropTypes.any).isRequired,
  drink: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BtnFavorite;
