import React from 'react';
import PropTypes from 'prop-types';

import storeMap from '../../styles/store-map.css';

export default function StoreMapPOIsItem({
  coordinates: { x, y },
  hideDescription,
  description,
  icon
}) {
  const style = hideDescription ?
    { opacity: 0 } :
    undefined;
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
      className={storeMap.poi}
      transform={`translate(${x}, ${y})`}
    >
      <text>{displayIcon}</text>
      <text
        style={style}
        y="20"
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

