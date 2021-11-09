import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';
import SearchRadio from '../../components/SearchRadio';

function Drinks() {
  return (
    <div>
      <Header page="Bebidas" />
      <SearchRadio page="Bebidas" />
      <RecipesList page="Bebidas" />
      <Footer />
    </div>
  );
}

export default Drinks;
