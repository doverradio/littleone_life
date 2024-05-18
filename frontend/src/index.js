/* eslint-disable import/first */
// import 'ses/lockdown';

// // eslint-disable-next-line no-undef
// lockdown();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RoutesComponent from './Routes';

if (module.hot) {
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RoutesComponent />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
