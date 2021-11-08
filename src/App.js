import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Foods from './Pages/Meals/Foods';
import Drinks from './Pages/Meals/Drinks';
import FoodDetails from './Pages/Meals/FoodDetails';
import DrinkDetails from './Pages/Meals/DrinksDetails';
import Explore from './Pages/Explorer/Explore';
import ExploreDrink from './Pages/Explorer/ExploreDrinks';
import ExploreDrinksIngredient from './Pages/Explorer/ExploreDrinksIngredients';
import ExploreFoodIngredient from './Pages/Explorer/ExploreFoodIngredients';
import ExploreOrigin from './Pages/Explorer/ExploreOrigin';
import ExploreFood from './Pages/Explorer/ExploreFood';
import DoneRecipes from './Pages/Recipes/DoneRecipes';
import FavoriteRecipes from './Pages/Recipes/FavoritesRecipes';
import NotFound from './Pages/Recipes/NotFound';
import ProgressRecipes from './Pages/Recipes/ProgressRecipes';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ ProgressRecipes } />
        <Route exact path="/bebidas/:id/in-progress" component={ ProgressRecipes } />
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
  );
}

export default App;
