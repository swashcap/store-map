import React from 'react';
import PropTypes from 'prop-types';

import StoreMapPOIsItem from './store-map-pois-item';
import storeMap from '../../styles/store-map.css';

export default function StoreMapPOIs({
  height,
  hideDescriptions,
  pois,
  width
}) {
  return (
    <svg
      className={storeMap.pois}
      preserveAspectRatio="xMinYMin"
      viewBox={`0 0 ${width} ${height}`}
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
  height: PropTypes.number.isRequired,
  hideDescriptions: PropTypes.bool.isRequired,
  pois: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired
};

