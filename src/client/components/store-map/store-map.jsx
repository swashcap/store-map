import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { container } from '../../styles/store-map.css';

import StoreMapControls from './store-map-controls';
import StoreMapGraphic from './store-map-graphic';

export default class StoreMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      },
      items: [{
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
      }],
      pois: [{
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
      }],
      scale: props.initialScale
    };

    this.setRef = this.setRef.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  onComponentWillMount() {
  }

  getBounds(scale) {
    const { boundaryPadding } = this.props;
    const { offsetHeight, offsetWidth } = this.el;
    /* eslint-disable no-magic-numbers */
    const bottom = offsetHeight + (offsetHeight * scale - offsetHeight) / 2 - boundaryPadding;
    const right = offsetWidth + (offsetWidth * scale - offsetWidth) / 2 - boundaryPadding;
    /* eslint-enable no-magic-numbers */

    return {
      bottom,
      left: -1 * right,
      right,
      top: -1 * bottom
    };
  }

  setRef(element) {
    this.el = element;

    this.setState({
      bounds: this.getBounds(this.state.scale),
      items: this.state.items,
      pois: this.state.pois,
      scale: this.state.scale
    });
  }

  zoom(newScale) {
    this.setState({
      bounds: this.getBounds(newScale),
      items: this.state.items,
      pois: this.state.pois,
      scale: newScale
    });
  }

  render() {
    const { labelsThreshold, scaleFactor } = this.props;
    const { bounds, items, pois, scale } = this.state;

    return (
      <div
        className={container}
        ref={this.setRef}
      >
        <StoreMapGraphic
          bounds={bounds}
          hideDescriptions={scale < labelsThreshold}
          items={items}
          pois={pois}
          scale={scale}
        />
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
  initialScale: 2,
  labelsThreshold: 1.5,
  scaleFactor: 0.4
};

StoreMap.displayName = 'StoreMap';

StoreMap.propTypes = {
  boundaryPadding: PropTypes.number,
  initialScale: PropTypes.number,
  labelsThreshold: PropTypes.number,
  scaleFactor: PropTypes.number
};

