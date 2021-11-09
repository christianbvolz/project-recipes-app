import React, { useState } from 'react';
import PropTypes from 'prop-types';
import allContext from './context';
import {
  fetchApiLatter,
  fetchApiIngredient,
  fetchApiName,
  fetchApicocktailIngredient,
  fetchApiCocktailName,
  fetchApiLatterCocktail,
} from '../services/fetchApi';

const ProviderContext = ({ children }) => {
  const [inputComida, setInputComida] = useState('');
  const [radio, setRadio] = useState('');
  const [recipes, setRecipes] = useState({});

  const hadlechange = (valueInput) => setInputComida(valueInput);
  const hadleRadio = (valueRadio) => setRadio(valueRadio);

  const filterPrimary = async (page) => {
    if (page === 'Comidas') {
      switch (radio) {
      case 'ingrediente':
        setRecipes(await fetchApiIngredient(inputComida));
        break;
      case 'nome':
        setRecipes(await fetchApiName(inputComida));
        break;
      case 'primeira letra':
        if (inputComida.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          setRecipes(await fetchApiLatter(inputComida));
        }
        break;
      default:
        setRecipes(await fetchApiLatter('a'));
        break;
      }
    } else if (page === 'Bebidas') {
      switch (radio) {
      case 'ingrediente':
        setRecipes(await fetchApicocktailIngredient(inputComida));
        break;
      case 'nome':
        setRecipes(await fetchApiCocktailName(inputComida));
        break;
      case 'primeira letra':
        if (inputComida.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          setRecipes(await fetchApiLatterCocktail(inputComida));
        }
        break;
      default:
        setRecipes(await fetchApiLatterCocktail('a'));
        break;
      }
    }
  };

  console.log(recipes.length);

  const stateGlobal = {
    hadleRadio,
    hadlechange,
    filterPrimary,
    recipes,
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
