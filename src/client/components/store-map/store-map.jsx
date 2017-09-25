import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';

import { container } from '../../styles/store-map.css';

import StoreMapControls from './store-map-controls';
import StoreMapGraphic from './store-map-graphic';

const items = [{
  coordinates: {
    x: 555,
    y: 333
  },
  description: 'My Item',
  id: '31c0ab'
}, {
  coordinates: {
    x: 237,
    y: 480
  },
  description: 'My Other Item',
  id: '41ace9'
}];
const pois = [{
  coordinates: {
    x: 328,
    y: 127
  },
  description: 'Men’s Restroom',
  icon: 'mens-restroom',
  id: 'ef072c'
}, {
  coordinates: {
    x: 543,
    y: 542
  },
  description: 'Women’s Restroom',
  icon: 'womens-restroom',
  id: 'fc911a'
}, {
  coordinates: {
    x: 250,
    y: 318
  },
  description: 'Toys',
  icon: 'toys',
  id: '8cb3aa'
}, {
  coordinates: {
    x: 663,
    y: 539
  },
  description: 'McDonald’s Restaurant',
  icon: 'mcdonalds',
  id: '815dab'
}];

export default class StoreMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items,
      pois,
      position: props.initialPosition,
      scale: props.initialScale
    };

    this.onPan = this.onPan.bind(this);
    this.onPanStart = this.onPanStart.bind(this);
    this.onPinch = this.onPinch.bind(this);
    this.onPinchStart = this.onPinchStart.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  /**
   * Handle mouse move and touch move events.
   *
   * {@link http://hammerjs.github.io/api/#event-object}
   *
   * @param {Event} event
   * @param {number} event.deltaX
   * @param {number} event.deltaY
   */
  onPan(event) {
    this.setState({
      items: this.state.items,
      pois: this.state.pois,
      position: {
        x: this._initialX + event.deltaX,
        y: this._initialY + event.deltaY
      },
      scale: this.state.scale
    });
  }
  
  /**
   * Set initial coordinates on pan start.
   */
  onPanStart() {
    this._initialX = this.state.position.x;
    this._initialY = this.state.position.y;
  }

  /**
   * {@link http://hammerjs.github.io/api/#event-object}
   *
   * @param {Event} event
   * @param {number} event.scale
   */
  onPinch(event) {
    this.zoom(this.state.scale + 0.1 * (event.scale - 1));
  }

  /**
   * Set initial scale on pinch start.
   */
  onPinchStart() {
    this._initialScale = this.state.scale;
  }

  /**
   * Zoom/un-zoom scale.
   *
   * @param {number}
   */
  zoom(scale) {
    if (scale < 4 && scale > 0.66) {
      this.setState({
        items: this.state.items,
        pois: this.state.pois,
        position: this.state.position,
        scale
      });
    }
  }

  render() {
    const { labelsThreshold, scaleFactor } = this.props;
    const { items, pois, position, scale } = this.state;

    return (
      <div
        className={container}
        ref={this.setRef}
      >
        <Hammer
          onPan={this.onPan}
          onPanStart={this.onPanStart}
          onPinch={this.onPinch}
          onPinchStart={this.onPinchStart}
          options={{
            recognizers: {
              pinch: {
                enable: true
              }
            }
          }}
        >
          <StoreMapGraphic
            hideDescriptions={scale < labelsThreshold}
            items={items}
            pois={pois}
            position={position}
            scale={scale}
          />
        </Hammer>
        <StoreMapControls
          unzoom={() => this.zoom(scale - scaleFactor)}
          zoom={() => this.zoom(scale + scaleFactor)}
        />
      </div>
    );
  }
}

StoreMap.defaultProps = {
  boundaryPadding: 20,
  initialPosition: {
    x: 0,
    y: 0
  },
  initialScale: 1,
  labelsThreshold: 1.5,
  scaleFactor: 0.4
};

StoreMap.displayName = 'StoreMap';

StoreMap.propTypes = {
  boundaryPadding: PropTypes.number,
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  initialScale: PropTypes.number,
  labelsThreshold: PropTypes.number,
  scaleFactor: PropTypes.number
};

