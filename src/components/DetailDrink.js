import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { detailDrink } from '../services/DetailFecht';
import { recommendedDrink } from '../services/recommendedFech';

function DetailDrink() {
  const [drink, setDrink] = useState({});
  const [recommended, setRecommended] = useState([]);
  const { idDrink } = useParams();

  const fetch = async () => {
    setDrink(await detailDrink(idDrink));
    setRecommended(await recommendedDrink());
  };

  useEffect(() => { fetch(); }, []);

  const sliceItens = 6;

  const listIngredients = Object.keys(drink)
    .filter((item) => item.match(/strIngredient\d{1,2}/));

  const listChaves = listIngredients.filter((item) => drink[item] !== null);

  const listMeasure = Object.keys(drink)
    .filter((item) => item.match(/strMeasure\d{1,2}/));

  const listChavesMesure = listMeasure
    .filter((item) => drink[item] !== null && drink[item] !== '');

  const returnIngredien = (ingredient, i) => (
    <p
      data-testid={ `${i}-ingredient-name-and-measure` }
      key={ i }
    >
      { `${drink[ingredient]} - ${drink[listChavesMesure[i]]}` }
    </p>
  );

  const carousel = (item, index) => (
    <p
      key={ index }
      data-testid={ `${index}-recomendation-card` }
    >
      desenvolver recomendado
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
        {recommended ? recommended.slice(0, sliceItens)
          .map((item, index) => carousel(item, index)) : null }
        <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
      </>
    );
  }
  return (
    <p>carregando</p>
  );
}

export default DetailDrink;
