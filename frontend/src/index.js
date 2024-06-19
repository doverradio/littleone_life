import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RoutesComponent from './Routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);

if (module.hot) {
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <RoutesComponent />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
