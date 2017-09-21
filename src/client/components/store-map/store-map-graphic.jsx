import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import StoreMapPOIs from './store-map-pois';
import StoreMapItems from './store-map-items';
import sampleMap from '../../images/2243.svg';
import storeMap from '../../styles/store-map.css';

export default function StoreMapGraphic({
  bounds,
  defaultPosition,
  hideDescriptions,
  items,
  pois,
  scale
}) {
  return (
    <div className={storeMap.graphic}>
      <Draggable
        bounds={bounds}
        defaultClassName={storeMap['graphic-draggable']}
        defaultClassNameDragged="draggable-dragged"
        defaultClassNameDragging="draggable-dragging"
        defaultPosition={defaultPosition}
      >
        <div>
          <div
            className={storeMap['graphic-scaler']}
            style={{ transform: `scale(${scale})` }}
          >
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
      </Draggable>
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
  bounds: PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  }),
  hideDescriptions: PropTypes.bool.isRequired,
  items: PropTypes.array,
  pois: PropTypes.array.isRequired,
  defaultPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  scale: PropTypes.number.isRequired
};
