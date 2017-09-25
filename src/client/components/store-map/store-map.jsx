import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';

import { container } from '../../styles/store-map.css';

import StoreMapControls from './store-map-controls';
import StoreMapGraphic from './store-map-graphic';

const sampleItems = [{
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
const samplePois = [{
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

/**
 * Store map component.
 *
 * @extends React.Component
 */
export default class StoreMap extends Component {
  /**
   * Create a store component
   *
   * @param {Object} props Component's passed properties
   * @param {Object} [props.initialPosition] Initial horizontal and vertical
   * position of the map
   * @param {number} [props.initialScale=1] Initial scale of the map
   * @param {number} [props.labelThreshold=1.5] Labels appear when the zoom
   * level is greater than threshold
   * @param {number} [props.maxScale=4] Maximum scale
   * @param {number} [props.minScale=0.5] Minimum scale
   * @param {number} [pinchFactor=0.1] Factor to adjust scale during punch/pull
   * @param {number} [props.scaleFactor=0.4] Scale factor to increase/decrease
   * map's scale when zoom buttons are clicked
   */
  constructor(props) {
    super(props);

    this.state = {
      items: sampleItems,
      pois: samplePois,
      position: props.initialPosition,
      scale: props.initialScale
    };

    this.handleOnPan = this.handleOnPan.bind(this);
    this.handleOnPanStart = this.handleOnPanStart.bind(this);
    this.handleOnPinch = this.handleOnPinch.bind(this);
    this.handleOnPinchStart = this.handleOnPinchStart.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  /**
   * Handle mouse move and touch move events.
   *
   * {@link http://hammerjs.github.io/api/#event-object}
   *
   * @param {Event} event Hammer.js-wrapped DOM event
   * @param {number} event.deltaX Hammer.js calculated change in X
   * @param {number} event.deltaY Hammer.js calculated change in Y
   * @returns {undefined}
   */
  handleOnPan(event) {
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
   *
   * @returns {undefined}
   */
  handleOnPanStart() {
    this._initialX = this.state.position.x;
    this._initialY = this.state.position.y;
  }

  /**
   * {@link http://hammerjs.github.io/api/#event-object}
   *
   * @param {Event} event Hammer.js-wrapped DOM event
   * @param {number} event.scale Hammer.js calculated scale change
   *
   * @returns {undefined}
   */
  handleOnPinch(event) {
    this.setScale(
      this.state.scale + this.props.pinchFactor * (event.scale - 1)
    );
  }

  /**
   * Set initial scale on pinch start.
   *
   * @returns {undefined}
   */
  handleOnPinchStart() {
    this._initialScale = this.state.scale;
  }

  /**
   * Conditionally set the `scale` state.
   *
   * @param {number} scale New scale to set
   * @returns {undefined}
   */
  setScale(scale) {
    if (scale < this.props.maxScale && scale > this.props.minScale) {
      this.setState({
        items: this.state.items,
        pois: this.state.pois,
        position: this.state.position,
        scale
      });
    }
  }

  /**
   * Increase the scale.
   *
   * @returns {undefined}
   */
  zoomIn() {
    this.setScale(this.state.scale - this.props.scaleFactor);
  }

  /**
   * Decrease the scale.
   *
   * @returns {undefined}
   */
  zoomOut() {
    this.setScale(this.state.scale - this.props.scaleFactor);
  }

  render() {
    const { items, pois, position, scale } = this.state;

    return (
      <div
        className={container}
        ref={this.setRef}
      >
        <Hammer
          onPan={this.handleOnPan}
          onPanStart={this.handleOnPanStart}
          onPinch={this.handleOnPinch}
          onPinchStart={this.handleOnPinchStart}
          options={{
            recognizers: {
              pinch: {
                enable: true
              }
            }
          }}
        >
          <StoreMapGraphic
            hideDescriptions={scale < this.props.labelsThreshold}
            items={items}
            pois={pois}
            position={position}
            scale={scale}
          />
        </Hammer>
        <StoreMapControls
          unzoom={this.zoomOut}
          zoom={this.zoomIn}
        />
      </div>
    );
  }
}

StoreMap.defaultProps = {
  initialPosition: {
    x: 0,
    y: 0
  },
  initialScale: 1,
  labelsThreshold: 1.5,
  maxScale: 4,
  minScale: 0.5,
  pinchFactor: 0.1,
  scaleFactor: 0.4
};

StoreMap.displayName = 'StoreMap';

StoreMap.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  initialScale: PropTypes.number,
  labelsThreshold: PropTypes.number,
  maxScale: PropTypes.number,
  minScale: PropTypes.number,
  pinchFactor: PropTypes.number,
  scaleFactor: PropTypes.number
};

