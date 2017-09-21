import React from 'react';
import PropTypes from 'prop-types';

import { controls } from '../../styles/store-map.css';

export default function StoreMapControls({
  unzoom,
  zoom
}) {
  return (
    <div className={controls}>
      <button
        aria-label="Zoom in"
        onClick={zoom}
      >
        <span aria-hidden="true">+</span>
      </button>
      <button
        aria-label="Zoom out"
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
