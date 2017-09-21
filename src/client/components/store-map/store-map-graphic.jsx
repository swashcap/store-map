import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import StoreMapPOIs from './store-map-pois';
import StoreMapItems from './store-map-items';
import sampleMap from '../images/2243.svg';

export default function StoreMapGraphic({
  bounds,
  defaultPosition,
  hideDescriptions,
  items,
  pois,
  scale
}) {
  return (
    <Draggable
      bounds={bounds}
      defaultClassName="store-map-graphic"
      defaultClassNameDragged="store-map-graphic-dragged"
      defaultClassNameDragging="store-map-graphic-dragging"
      defaultPosition={defaultPosition}
    >
      <div className="store-map-graphic-draggable">
        <div
          className="store-map-graphic-scaler"
          style={{ transform: `scale(${scale})` }}
        >
          <img src={sampleMap} />
          <StoreMapPOIs hideDescriptions={hideDescriptions} pois={pois} />
          <StoreMapItems
            height={602}
            items={items}
            scale={scale}
            width={898}
          />
        </div>
      </div>
    </Draggable>
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
