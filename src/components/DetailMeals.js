import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import { detailMeal } from '../services/DetailFecht';
import { recommendedDrink } from '../services/recommendedFech';
import CarrouselRender from './Carousel';
import '../Style/Btn-Recipe.css';

function Detailmeals() {
  const [btnCompartilhar, setBtnCompartilhar] = useState('compartilhar');
  const [btnRecipe, setBtnRecipe] = useState('Iniciar receita');
  const [meal, setDetail] = useState({});
  const [recommended, setRecommended] = useState([]);
  const { idMeal } = useParams();

  const sliceItens = 6;
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      setDetail(await detailMeal(idMeal));
      setRecommended(await recommendedDrink());
    };
    fetch();
  }, [idMeal]);

  useEffect(() => {
    const initial = !localStorage.getItem('inProgressRecipes');
    const checkStorage = () => {
      if (initial) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: {},
          meals: {},
        }));
      }
    };

    checkStorage();
  }, []);

  useEffect(() => {
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const exist = Object.keys(meals).some((el) => el === idMeal);
    if (exist) setBtnRecipe('Continuar Receita');
  }, [idMeal]);

  const startRecipe = () => {
    history.push(`/comidas/${idMeal}/in-progress`);
  };

  const clipboard = () => {
    const urlRecommendetion = window.location.href;
    copy(urlRecommendetion);
    setBtnCompartilhar('Link copiado!');
  };

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
      data-testid={ `${i}-ingredient-name-and-measure` }
      key={ i }
    >
      { `${meal[ingredient]} - ${meal[listChavesMesure[i]]}` }
    </p>

  );

  if (meal.idMeal) {
    const idYouTube = meal.strYoutube.split('=');
    const recommendedRec = recommended ? recommended.slice(0, sliceItens) : null;
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt="img food"
        />
        <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
        <button
          onClick={ () => clipboard() }
          type="button"
          data-testid="share-btn"
        >
          { btnCompartilhar }
        </button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <h3 data-testid="recipe-category">{ meal.strCategory }</h3>
        <h3>Ingredientes</h3>
        { listChaves.map((ingredient, i) => returnIngredien(ingredient, i)) }
        <p data-testid="instructions">{ meal.strInstructions }</p>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${idYouTube[1]}` }
          title={ meal.idMeal }
          frameBorder="0"
          allowFullScreen
        />
        { recommended
          ? <CarrouselRender recommendMeal={ recommendedRec } /> : null }
        <button
          onClick={ () => startRecipe() }
          className="iniciar-Recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          { btnRecipe }
        </button>
      </>
    );
  }
  return (
    <p>carregando</p>
  );
}

export default Detailmeals;
