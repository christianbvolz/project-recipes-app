import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { detailMeal } from '../../services/DetailFecht';

function ProgressMealsRecipes() {
  const [meal, setRecipe] = useState({});
  const [UsedIngredients, setUsedIngredients] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const listIngredients = Object.keys(meal)
    .filter((item) => item.match(/strIngredient\d{1,2}/));

  const listChaves = listIngredients
    .filter((item) => meal[item] !== null && meal[item] !== '');

  const listMeasure = Object.keys(meal)
    .filter((item) => item.match(/strMeasure\d{1,2}/));

  const listChavesMesure = listMeasure
    .filter((item) => meal[item] !== null && meal[item] !== '');

  useEffect(() => {
    const fetch = async () => {
      setRecipe(await detailMeal(id));
    };
    fetch();
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!meals[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        meals: {
          ...meals,
          [id]: [],
        },
      }));
    } else {
      setUsedIngredients(meals[id]);
    }
  }, [id]);

  useEffect(() => {
    const getRecipesInProgress = localStorage.getItem('inProgressRecipes');
    const recipesInProgress = JSON.parse(getRecipesInProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...JSON.parse(localStorage.getItem('inProgressRecipes')),
      meals: {
        ...recipesInProgress.meals,
        [id]: UsedIngredients,
      },
    }));
  }, [UsedIngredients, id]);

  const returnIngredien = (ingredient, i) => (
    <p
      data-testid={ `${i}-ingredient-step` }
      key={ i }
      style={ UsedIngredients.includes(meal[ingredient])
        ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
        : { textDecoration: '' } }
    >
      <label htmlFor={ `${i}-ingredient-checkbox` }>
        <input
          type="checkbox"
          id={ `${i}-ingredient-checkbox` }
          checked={ UsedIngredients.includes(meal[ingredient]) }
          onChange={ () => {
            if (!UsedIngredients.includes(meal[ingredient])) {
              setUsedIngredients([...UsedIngredients, meal[ingredient]]);
            } else {
              setUsedIngredients([...UsedIngredients
                .filter((item) => item !== meal[ingredient])]);
            }
          } }
        />
        { `${meal[ingredient]} - ${meal[listChavesMesure[i]] || ''}` }
      </label>
    </p>
  );

  if (meal.idMeal) {
    console.log(UsedIngredients.length, listChaves.length);
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
        <div>
          <h3>Ingredientes</h3>
          { listChaves.map((ingredient, i) => returnIngredien(ingredient, i)) }
        </div>
        <p data-testid="instructions">{ meal.strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ UsedIngredients.length !== listChaves.length }
          onClick={ () => history.push('/receitas-feitas') }
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
