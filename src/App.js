import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProviderContext from './Context/provider';
import Login from './Pages/Login';
import Foods from './Pages/Meals/Foods';
import Drinks from './Pages/Drinks/Drinks';
import FoodDetails from './Pages/Meals/FoodDetails';
import DrinkDetails from './Pages/Drinks/DrinksDetails';
import Explore from './Pages/Explorer/Explore';
import ExploreDrink from './Pages/Explorer/ExploreDrinks';
import ExploreDrinksIngredient from './Pages/Explorer/ExploreDrinksIngredients';
import ExploreFoodIngredient from './Pages/Explorer/ExploreFoodIngredients';
import ExploreOrigin from './Pages/Explorer/ExploreOrigin';
import ExploreFood from './Pages/Explorer/ExploreFood';
import DoneRecipes from './Pages/Recipes/DoneRecipes';
import FavoriteRecipes from './Pages/Recipes/FavoritesRecipes';
import NotFound from './Pages/Recipes/NotFound';
import ProgressMealsRecipes from './Pages/Recipes/ProgressMealsRecipes';
import ProgressDrinksRecipes from './Pages/Recipes/ProgressDrinksRecipes';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <ProviderContext>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/comidas/:idMeal" component={ FoodDetails } />
          <Route exact path="/bebidas/:idDrink" component={ DrinkDetails } />
          <Route path="/comidas/:id/in-progress" component={ ProgressMealsRecipes } />
          <Route path="/bebidas/:id/in-progress" component={ ProgressDrinksRecipes } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFood } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodIngredient }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksIngredient }
          />
          <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
          <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="/perfil" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </ProviderContext>
  );
}

export default App;
