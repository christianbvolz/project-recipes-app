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
      Por Ingredientes
    </Link>
    <Link
      data-testid="explore-by-area"
      to="/explorar/comidas/area"
    >
      Por Local de Origem
    </Link>
    <Link
      data-testid="explore-surprise"
      to="/comidas/52771"
    >
      Me Surpreenda!
    </Link>
    <Footer />
  </div>
);

export default ExploreFood;
