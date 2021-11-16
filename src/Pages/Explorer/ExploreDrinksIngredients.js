import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import allContext from '../../Context/context';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';
import { fetchApiIngredientDrinks, fetchDrinkIng } from '../../services/fetchApi';

function ExploreDrinksIngredient() {
  const INGREDIENTS_MAX = 12;
  const [ingredients, setIngredients] = useState([]);
  const { setRecipesDrinks } = useContext(allContext);

  const getIngredients = async () => {
    const { drinks } = await fetchApiIngredientDrinks();
    setIngredients(drinks);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const getDrinkIng = async (strIngredient1) => {
    const data = await fetchDrinkIng(strIngredient1);
    const newData = data;
    setRecipesDrinks(newData);
  };

  return (
    <div>
      <p>Explore Drinks Ingredients</p>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      {
        ingredients.map(({ strIngredient1 }, index) => {
          if (index < INGREDIENTS_MAX) {
            return (
              <Link
                to="/bebidas"
                onClick={ () => getDrinkIng(strIngredient1) }
              >
                <div key={ index } data-testid={ `${index}-ingredient-card` }>
                  <h2 data-testid={ `${index}-card-name` }>{strIngredient1}</h2>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                    alt={ strIngredient1 }
                  />
                </div>
              </Link>
            );
          }
          return null;
        })
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredient;
