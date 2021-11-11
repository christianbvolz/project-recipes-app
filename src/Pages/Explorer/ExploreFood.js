import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';

const ExploreFood = () => (
  <div>
    <HeaderWithoutSearch page="Explorar Comidas" />
    <Link
      data-testid="explore-by-ingredient"
      to="/explorar/comidas/ingredientes"
    >
      <button type="button">Por Ingredientes</button>
    </Link>
    <Link
      data-testid="explore-by-area"
      to="/explorar/comidas/area"
    >
      <button type="button">Por Local de Origem</button>
    </Link>
    <Link
      data-testid="explore-surprise"
      to="/comidas/52771"
    >
      <button type="button">Me Surpreenda!</button>
    </Link>
    <Footer />
  </div>
);

export default ExploreFood;
