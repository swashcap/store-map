import React from 'react';
import PropTypes from 'prop-types';

export default function StoreMapControls({
  unzoom,
  zoom
}) {
  return (
    <div className="store-map-controls">
      <button
        aria-label="Zoom in"
        className="button button-primary"
        onClick={zoom}
      >
        <span aria-hidden="true">+</span>
      </button>
      <button
        aria-label="Zoom out"
        className="button button-primary"
        onClick={unzoom}
      >
        <span aria-hidden="true">-</span>
      </button>
    </div>
  );
}

StoreMapControls.displayName = 'StoreMapControls';

StoreMapControls.propTypes = {
  unzoom: PropTypes.func.isRequired,
  zoom: PropTypes.func.isRequired
};
