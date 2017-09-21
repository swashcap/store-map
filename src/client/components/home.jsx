/*
 * This is a demo component the Eletrode app generator included
 * to show using Skeleton CSS lib (named base.css) and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from 'react';
import { Link } from 'react-router';
import '../styles/normalize.css';
import skeleton from '../styles/skeleton.css';
import custom from '../styles/custom.css';
import StoreMap from './store-map/store-map';

export default () =>
  <div className={custom.root}>
    <nav className={custom.nav}>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
    <main className={custom.main}>
      <StoreMap />
    </main>
  </div>;
