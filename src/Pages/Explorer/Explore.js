import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderWithoutSearch from '../../components/HeaderNoSearchInput';

const Explore = () => (
  <div>
    <HeaderWithoutSearch page="Explorar" />
    <Link to="/explorar/comidas">
      <button
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
    </Link>
    <Link to="/explorar/bebidas">
      <button
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </Link>
    <Footer />
  </div>
);

export default Explore;
