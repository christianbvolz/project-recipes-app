import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailMeal } from '../../services/DetailFecht';

function ProgressMealsRecipes() {
  const [meal, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const resp = await detailMeal(id);
      console.log(resp);
      setRecipe(await detailMeal(id));
    };
    fetch();
  }, [id]);

  const listIngredients = Object.keys(meal)
    .filter((item) => item.match(/strIngredient\d{1,2}/));

  const listChaves = listIngredients
    .filter((item) => meal[item] !== null && meal[item] !== '');

  const listMeasure = Object.keys(meal)
    .filter((item) => item.match(/strMeasure\d{1,2}/));

  const listChavesMesure = listMeasure
    .filter((item) => meal[item] !== null && meal[item] !== '');

  const returnIngredien = (ingredient, i) => (
    <p
      data-testid={ `${i}-ingredient-step` }
      key={ i }
    >
      { `${meal[ingredient]} - ${meal[listChavesMesure[i]]}` }
    </p>
  );

  if (meal.idMeal) {
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt="img food"
        />
        <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h3 data-testid="recipe-category">{ meal.strCategory }</h3>
        <h3>Ingredientes</h3>
        { listChaves.map((ingredient, i) => returnIngredien(ingredient, i)) }
        <p data-testid="instructions">{ meal.strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </>
    );
  }
  return (
    <p>carregando</p>
  );
}

export default ProgressMealsRecipes;
