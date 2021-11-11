import React, { useEffect, useState } from 'react';
import { fetchApiMealsAreaList } from '../services/fetchApi';

export default function SelectArea() {
  const [areaOptions, setAreaOptions] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const { meals } = await fetchApiMealsAreaList();
      setAreaOptions(meals);
    }

    fetchMyAPI();
  }, []);
  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        // onChange={ }
      >
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
