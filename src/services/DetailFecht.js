export const detailMeal = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((receita) => receita.json());
  return response.meals[0];
};

export const detailDrink = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((receita) => receita.json());
  return response.drinks[0];
};
