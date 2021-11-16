import React, { useState } from 'react';
import '../Style/Carousel.css';

function CarrouselRender({ recommendMeal, recommendR }) {
  const [position, setPosition] = useState(0);
  const chaveName = recommendR !== undefined ? 'strMeal' : 'strDrink';
  const list = recommendR !== undefined ? recommendR : recommendMeal;
  const img = recommendMeal !== undefined ? 'strDrinkThumb' : 'strMealThumb';

  const maxPosition = 5;
  const decrementPosition = -1;

  const positionControl = (i) => {
    if (position + i >= 0 && position + i < maxPosition) {
      setPosition(position + i);
    }
  };

  if (list[0]) {
    return (
      <div className="containner-carousel">
        <button
          onClick={ () => positionControl(decrementPosition) }
          type="button"
        >
          next
        </button>
        <div data-testid={ `${position}-recomendation-card` }>
          <img
            data-testid={ `${position}-recomendation-card` }
            className="img-card"
            src={ list[position][img] }
            alt={ list[position][chaveName] }
          />
          <p
            data-testid={ `${position}-recomendation-title` }
          >
            { list[position][chaveName] }

          </p>
        </div>

        <div data-testid={ `${position + 1}-recomendation-card` }>
          <img
            data-testid={ `${position + 1}-recomendation-card` }
            className="img-card"
            src={ list[(position + 1)][img] }
            alt={ list[(position + 1)][chaveName] }
          />
          <p
            data-testid={ `${position + 1}-recomendation-title` }
          >
            { list[(position + 1)][chaveName] }

          </p>
        </div>

        <div />
        <button onClick={ () => positionControl(1) } type="button">next</button>
      </div>
    );
  }
  return (
    <p>carregando</p>
  );
}

export default CarrouselRender;
