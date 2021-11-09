import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchRadio from '../../components/SearchRadio';
import RecipesList from '../../components/RecipesList';

const Food = () => (
  <div>
    <Header page="Comidas" />
    <SearchRadio page="Comidas" />
    <RecipesList page="Comidas" />
    <Footer />
  </div>
);

export default Food;
