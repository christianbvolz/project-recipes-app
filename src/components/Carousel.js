import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Style/Carousel.css';

function CarrouselRender({ recommendMeal, recommendR }) {
  const [position, setPosition] = useState(1);
  const chaveName = recommendR !== undefined ? 'strMeal' : 'strDrink';
  const list = recommendR !== undefined ? recommendR : recommendMeal;
  const img = recommendMeal !== undefined ? 'strDrinkThumb' : 'strMealThumb';

  const maxPosition = 6;
  const decrementPosition = -1;
  const notVisible = 'display-none';
  const visible = 'visible';

  const positionControl = (i) => {
    if (position + i >= 0 && position + i < maxPosition) {
      setPosition(position + i);
    }
  };

  const classCardRender = (index) => {
    if (position - 1 === index || position === index) return true;
    return false;
  };

  const constructorCard = (item, index) => (
    <div
      key={ index }
      className={ classCardRender(index) ? visible : notVisible }
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        className="img-card"
        src={ item[img] }
        alt={ item[chaveName] }
      />
      <p data-testid={ `${index}-recomendation-title` }>{ item[chaveName] }</p>
    </div>
  );

  if (list[0]) {
    return (
      <div className="containner-carousel">
        <button
          onClick={ () => positionControl(decrementPosition) }
          type="button"
        >
          { '<' }
        </button>
        { list.map((item, index) => constructorCard(item, index))}

        <div />
        <button onClick={ () => positionControl(1) } type="button">{ '>' }</button>
      </div>
    );
  }
  return (
    <p>carregando</p>
  );
}

CarrouselRender.propTypes = {
  recommendMeal: PropTypes.arrayOf(PropTypes.any).isRequired,
  recommendR: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CarrouselRender;
