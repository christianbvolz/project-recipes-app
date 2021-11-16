import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import allContext from '../../Context/context';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';
import { fetchApiIngredientMeals, fetchMealIng } from '../../services/fetchApi';

function ExploreFoodIngredient() {
  const INGREDIENTS_MAX = 12;
  const [ingredients, setIngredients] = useState([]);
  const { setRecipesMeals } = useContext(allContext);

  const getIngredients = async () => {
    const { meals } = await fetchApiIngredientMeals();
    setIngredients(meals);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const getMealIng = async (strIngredient) => {
    const data = await fetchMealIng(strIngredient);
    const newData = data;
    setRecipesMeals(newData);
  };

  return (
    <div>
      <p>Explore Food Ingredients</p>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      {
        ingredients.map(({ strIngredient }, index) => {
          if (index < INGREDIENTS_MAX) {
            return (
              <Link
                to="/comidas"
                onClick={ () => getMealIng(strIngredient) }
              >
                <div key={ index } data-testid={ `${index}-ingredient-card` }>
                  <h2 data-testid={ `${index}-card-name` }>{strIngredient}</h2>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                    alt={ strIngredient }
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

export default ExploreFoodIngredient;
