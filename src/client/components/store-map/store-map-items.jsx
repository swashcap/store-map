import React from 'react';
import PropTypes from 'prop-types';
import storeMap from '../../styles/store-map.css';

const SCALE_FACTOR = 1.5;

export default function StoreMapItems({
  height,
  items,
  scale,
  width
}) {
  return (
    <svg
      className={storeMap.items}
      preserveAspectRatio="xMinYMin"
      viewBox={`0 0 ${width} ${height}`}
    >
      <title>2243 Items</title>
      <g>
        {items.map((
          {
            coordinates: { x, y },
            description,
            id
          },
          index
        ) => (
          <g
            className={storeMap.item}
            key={id}
            transform={`translate(${x}, ${y})`}
          >
            <g
              transform={`scale(${SCALE_FACTOR / scale})`}
            >
              <circle cx="5" cy="5" r="10" />
              <text x="5" y="5">{index + 1}</text>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

StoreMapItems.displayName = 'StoreMapItems';

StoreMapItems.propTypes = {
  height: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    coordinates: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
  scale: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

