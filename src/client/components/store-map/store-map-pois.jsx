import React from 'react';
import PropTypes from 'prop-types';

import StoreMapPOIsItem from './store-map-pois-item';

export default function StoreMapPOIs({ hideDescriptions, pois }) {
  // SVG's viewBox matches map"s viewBox, width and height
  return (
    <svg
      className="store-map-pois"
      viewBox="0 0 898 602"
    >
      <title>2243 Points of Interest</title>
      <g>
        {pois.map(poi => (
          <StoreMapPOIsItem
            key={poi.id}
            hideDescription={hideDescriptions}
            {...poi}
          />
        ))}
      </g>
    </svg>
  );
}
StoreMapPOIs.displayName = 'StoreMapPOIs';

StoreMapPOIs.propTypes = {
  hideDescriptions: PropTypes.bool.isRequired,
  pois: PropTypes.array.isRequired
};

