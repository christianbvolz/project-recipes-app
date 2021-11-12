import React, { useEffect, useState, useContext } from 'react';
import { fetchApiMealsAreaList,
  fetchApiRecipesByArea,
  fetchApiAllMealsRecipes } from '../services/fetchApi';
import allContext from '../Context/context';

export default function SelectArea() {
  const [areaOptions, setAreaOptions] = useState([]);
  const { setRecipesMeals } = useContext(allContext);

  useEffect(() => {
    async function fetchMyAPI() {
      const { meals } = await fetchApiMealsAreaList();
      setAreaOptions(meals);
      setRecipesMeals(await fetchApiAllMealsRecipes());
    }

    fetchMyAPI();
  }, [setRecipesMeals]);

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ async ({ target: { value } }) => {
          const func = (value === 'All') ? fetchApiAllMealsRecipes
            : fetchApiRecipesByArea;
          setRecipesMeals(await func(value));
        } }
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        {areaOptions.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            value={ strArea }
            key={ strArea }
          >
            { strArea }
          </option>
        ))}
      </select>
    </div>
  );
}
