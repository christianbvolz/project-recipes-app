// import React from 'react';
// import allContext from '../Context/context';

// export default function CategoriesFilter() {
//   // const { categories, categoryFilter } = useContext(allContext);
//   // getRecipesByCategory vai para um arquivo separado
//   const getRecipesByCategory = async (categoryName) => {
//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
//     const responseJson = await response.json();
//     return responseJson;
//   };

//   const MaxCategories = 5;
//   return (
//     <div>
//       { categories.slice(0, MaxCategories).map(({ strCategory }) => (
//         <button
//           data-testid={ `${strCategory}-category-filter` }
//           type="button"
//           key={ strCategory }
//           onClick={ () => getRecipesByCategory(strCategory) }
//         >
//           { strCategory }
//         </button>
//       ))}
//     </div>
//   );
// }
