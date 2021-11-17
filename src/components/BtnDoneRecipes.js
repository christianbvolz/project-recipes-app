import React, { useEffect, useState } from 'react';

function ButtonDoneRecipe() {
  const [doneList, setDoneList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  console.log(filteredList);

  useEffect(() => {
    setDoneList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  useEffect(() => {
    setFilteredList([doneList]);
  }, [doneList]);

  const handleClickFilter = (filter) => {
    if (filter === 'comida' || filter === 'bebida') {
      setFilteredList([...doneList].filter((recipe) => recipe.type === filter));
    }
    if (filter === 'all') {
      setFilteredList([...doneList]);
    }
  };
  return (
    <div>
      <button
        type="button"
        value="All"
        data-testid="filter-by-all-btn"
        onClick={ () => handleClickFilter('All') }
      >
        All
      </button>
      <button
        type="button"
        value="idMeal"
        data-testid="filter-by-food-btn"
        onClick={ () => handleClickFilter('comida') }

      >
        Food
      </button>
      <button
        type="button"
        value="idDrink"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleClickFilter('drink') }

      >
        Drinks
      </button>
    </div>

  );
}

export default ButtonDoneRecipe;
