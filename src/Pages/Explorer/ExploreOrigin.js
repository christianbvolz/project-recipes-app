import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SelectArea from '../../components/SelectArea';
import RecipesList from '../../components/RecipesList';

const ExploreOrigin = () => (
  <div>
    <Header page="Explorar Origem" />
    <SelectArea />
    <RecipesList page="Comidas" />
    <Footer />
  </div>
);

export default ExploreOrigin;
