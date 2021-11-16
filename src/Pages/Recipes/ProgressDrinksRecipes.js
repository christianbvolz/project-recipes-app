import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailDrink } from '../../services/DetailFecht';

function ProgressDrinksRecipes() {
  const [drink, setDrink] = useState({});
  const [UsedIngredients, setUsedIngredients] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setDrink(await detailDrink(id));
    };
    fetch();
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
    const { drinks } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!drinks[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...JSON.parse(localStorage.getItem('inProgressRecipes')),
        drinks: {
          ...drinks,
          [id]: [],
        },
      }));
    } else {
      setUsedIngredients(drinks[id]);
    }
  }, [id]);

  const listIngredients = Object.keys(drink)
    .filter((item) => item.match(/strIngredient\d{1,2}/));

  const listChaves = listIngredients
    .filter((item) => drink[item] !== null && drink[item] !== '');

  const listMeasure = Object.keys(drink)
    .filter((item) => item.match(/strMeasure\d{1,2}/));

  const listChavesMesure = listMeasure
    .filter((item) => drink[item] !== null && drink[item] !== '');

  const returnIngredien = (ingredient, i) => (
    <p
      data-testid={ `${i}-ingredient-step` }
      key={ i }
      style={ UsedIngredients.includes(drink[ingredient])
        ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
        : { textDecoration: '' } }
    >
      <input
        type="checkbox"
        checked={ UsedIngredients.includes(drink[ingredient]) }
        onChange={ () => {
          const recipesInProgress = localStorage.getItem('inProgressRecipes');
          const { drinks } = JSON.parse(recipesInProgress);
          if (!UsedIngredients.includes(drink[ingredient])) {
            localStorage.setItem('inProgressRecipes', JSON.stringify({
              ...JSON.parse(recipesInProgress),
              drinks: {
                ...drinks,
                [id]: [...UsedIngredients, drink[ingredient]],
              },
            }));
            setUsedIngredients([...UsedIngredients, drink[ingredient]]);
          } else {
            localStorage.setItem('inProgressRecipes', JSON.stringify({
              ...JSON.parse(recipesInProgress),
              drinks: {
                ...drinks,
                [id]: [...UsedIngredients
                  .filter((item) => item !== drink[ingredient])],
              },
            }));
            setUsedIngredients([...UsedIngredients
              .filter((item) => item !== drink[ingredient])]);
          }
        } }
      />
      { `${drink[ingredient]} - ${drink[listChavesMesure[i]]}` }
    </p>
  );

  if (drink.idDrink) {
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt="img food"
        />
        <p data-testid="recipe-title">{ drink.strDrink }</p>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h3 data-testid="recipe-category">{ drink.strCategory }</h3>
        <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
        <h3 data-testid="recipe-category">Ingredientes</h3>
        { listChaves.map((ingredient, i) => returnIngredien(ingredient, i)) }
        <p data-testid="instructions">{ drink.strInstructions }</p>
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

export default ProgressDrinksRecipes;
