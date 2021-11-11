import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';

const ExploreDrinks = () => (
  <div>
    <HeaderWithoutSearch page="Explorar Bebidas" />
    <Link
      data-testid="explore-by-ingredient"
      to="/explorar/bebidas/ingredientes"
    >
      <button type="button">Por Ingredientes</button>
    </Link>
    <Link
      data-testid="explore-surprise"
      to="/bebidas/178319"
    >
      <button type="button">Me Surpreenda!</button>
    </Link>
    <Footer />
  </div>
);

export default ExploreDrinks;
