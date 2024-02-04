import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rating = ({ initialRating, maxRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    if (index === rating && index === 0.5) {
      setRating(0);
    } else {
      setRating(index);
    }
  };

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => {
        let starIcon;
        if (index + 1 <= rating) {
          starIcon = solidStar;
        } else if (index < rating && index + 1 > rating) {
          starIcon = halfStar;
        } else {
          starIcon = regularStar;
        }

        return (
          <FontAwesomeIcon
            key={index}
            icon={starIcon}
            className="mr-1"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index + 1)}
          />
        );
      })}
    </div>
  );
};

export default Rating;
