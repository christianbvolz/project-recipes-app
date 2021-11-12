import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';
import { fetchApiIngredientMeals } from '../../services/fetchApi';

function ExploreFoodIngredient() {
  const INGREDIENTS_MAX = 12;
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const { meals } = await fetchApiIngredientMeals();
    setIngredients(meals);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <p>Explore Food Ingredients</p>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      {
        ingredients.map(({ strIngredient }, index) => {
          if (index < INGREDIENTS_MAX) {
            return (
              <button
                type="button"
                key={ index }
              >
                <div key={ index } data-testid={ `${index}-ingredient-card` }>
                  <h2 data-testid={ `${index}-card-name` }>{strIngredient}</h2>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                    alt={ strIngredient }
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

export default ExploreFoodIngredient;
