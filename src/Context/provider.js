import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import allContext from './context';
import {
  fetchApiLatter,
  fetchApiIngredient,
  fetchApiName,
  fetchApicocktailIngredient,
  fetchApiCocktailName,
  fetchApiLatterCocktail,
  fetchApiAllMealsRecipes,
  fetchApiAllDrinksRecipes,
  fetchApiMealsCategoriesList,
  fetchApiDrinksCategoriesList,
} from '../services/fetchApi';

const ProviderContext = ({ children }) => {
  const [inputComida, setInputComida] = useState('');
  const [radio, setRadio] = useState('');
  const [recipesMeals, setRecipesMeals] = useState({});
  const [recipesDrinks, setRecipesDrinks] = useState({});
  const [mealsCategories, setMealsCategories] = useState({});
  const [drinksCategories, setDrinksCategories] = useState({});

  const alert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  useEffect(() => {
    async function fetchMyAPI() {
      setRecipesMeals(await fetchApiAllMealsRecipes());
      setRecipesDrinks(await fetchApiAllDrinksRecipes());
      setMealsCategories(await fetchApiMealsCategoriesList());
      setDrinksCategories(await fetchApiDrinksCategoriesList());
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (recipesMeals.meals === null) {
      global.alert(alert);
    }
  }, [recipesMeals]);

  useEffect(() => {
    if (recipesDrinks.drinks === null) {
      global.alert(alert);
    }
  }, [recipesDrinks]);

  const hadlechange = (valueInput) => setInputComida(valueInput);
  const hadleRadio = (valueRadio) => setRadio(valueRadio);

  const filterPrimary = async (page) => {
    if (page === 'Comidas') {
      switch (radio) {
      case 'ingrediente':
        setRecipesMeals(await fetchApiIngredient(inputComida));
        break;
      case 'nome':
        setRecipesMeals(await fetchApiName(inputComida));
        break;
      case 'primeira letra':
        if (inputComida.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          setRecipesMeals(await fetchApiLatter(inputComida));
        }
        break;
      default:
        setRecipesMeals(await fetchApiLatter('a'));
        break;
      }
    } else if (page === 'Bebidas') {
      switch (radio) {
      case 'ingrediente':
        setRecipesDrinks(await fetchApicocktailIngredient(inputComida));
        break;
      case 'nome':
        setRecipesDrinks(await fetchApiCocktailName(inputComida));
        break;
      case 'primeira letra':
        if (inputComida.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          setRecipesDrinks(await fetchApiLatterCocktail(inputComida));
        }
        break;
      default:
        setRecipesDrinks(await fetchApiLatterCocktail('a'));
        break;
      }
    }
  };

  const stateGlobal = {
    hadleRadio,
    hadlechange,
    filterPrimary,
    recipesMeals,
    recipesDrinks,
    mealsCategories,
    drinksCategories,
    setRecipesMeals,
    setRecipesDrinks,
  };

  return (
    <main>
      <allContext.Provider value={ stateGlobal }>{children}</allContext.Provider>
    </main>
  );
};

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;
