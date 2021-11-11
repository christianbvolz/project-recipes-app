export const recommendedDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((arr) => arr.json());
  return response.drinks;
};

export const recommendedMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((arr) => arr.json());
  return response;
};
