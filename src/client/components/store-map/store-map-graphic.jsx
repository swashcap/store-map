import React from 'react';
import PropTypes from 'prop-types';

import StoreMapPOIs from './store-map-pois';
import StoreMapItems from './store-map-items';
import sampleMap from '../../images/2243.svg';
import storeMap from '../../styles/store-map.css';

export default function StoreMapGraphic({
  hideDescriptions,
  items,
  pois,
  position: { x, y },
  scale
}) {
  const translateStyle = {
    transform: `translate(${x}px, ${y}px)`
  };
  const scaleStyle = {
    transform: `scale(${scale})`
  };

  return (
    <div className={storeMap.graphic}>
      <div style={translateStyle}>
        <div style={scaleStyle}>
          <img
            className={storeMap.map}
            src={sampleMap}
          />
          <StoreMapPOIs
            height={602}
            hideDescriptions={hideDescriptions}
            pois={pois}
            width={898}
          />
          <StoreMapItems
            height={602}
            items={items}
            scale={scale}
            width={898}
          />
        </div>
      </div>
    </div>
  );
}

StoreMapGraphic.defaultProps = {
  defaultPosition: {
    x: 0,
    y: 0
  },
  items: []
};

StoreMapGraphic.displayName = 'StoreMapGraphic';

StoreMapGraphic.propTypes = {
  hideDescriptions: PropTypes.bool.isRequired,
  items: PropTypes.array,
  pois: PropTypes.array.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  scale: PropTypes.number.isRequired
};
