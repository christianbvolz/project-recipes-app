import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';
import { fetchApiIngredientDrinks } from '../../services/fetchApi';

function ExploreDrinksIngredient() {
  const INGREDIENTS_MAX = 12;
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const { drinks } = await fetchApiIngredientDrinks();
    setIngredients(drinks);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <p>Explore Drinks Ingredients</p>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      {
        ingredients.map(({ strIngredient1 }, index) => {
          if (index < INGREDIENTS_MAX) {
            return (
              <button
                type="button"
                key={ index }
              >
                <div key={ index } data-testid={ `${index}-ingredient-card` }>
                  <h2 data-testid={ `${index}-card-name` }>{strIngredient1}</h2>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                    alt={ strIngredient1 }
                  />
                </div>
              </button>
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
