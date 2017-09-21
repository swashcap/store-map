import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function StoreMapPOIsItem({
  coordinates: { x, y },
  hideDescription,
  description,
  icon
}) {
  const className = classnames('store-map-pois-item-description', {
    'is-hidden': hideDescription
  });

  let displayIcon;

  if (icon === 'mcdonalds') {
    displayIcon = '🍔🍟';
  } else if (icon === 'mens-restroom') {
    displayIcon = '🚹';
  } else if (icon === 'toys') {
    displayIcon = '😎';
  } else if (icon === 'womens-restroom') {
    displayIcon = '🚺';
  } else {
      displayIcon = '😶';
  }

  return (
    <g
      className="store-map-pois-item"
      transform={`translate(${x}, ${y})`}
    >
      <text className="store-map-pois-item-icon">{displayIcon}</text>
      <text
        className={className}
        x="20"
      >
        {description}
      </text>
    </g>
  );
}

StoreMapPOIsItem.displayName = 'StoreMapPOIs.Item';

StoreMapPOIsItem.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  description: PropTypes.string.isRequired,
  hideDescription: PropTypes.bool.isRequired,
  icon: PropTypes.oneOf([
    'mcdonalds',
    'mens-restroom',
    'toys',
    'womens-restroom'
  ]).isRequired,
  id: PropTypes.string.isRequired
};

