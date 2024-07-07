import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RoutesComponent from './Routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';

console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);

if (module.hot) {
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <UserProvider>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <RoutesComponent />
    </GoogleOAuthProvider>
  </UserProvider>
=======
  <React.StrictMode>
    <RoutesComponent />
  </React.StrictMode>
>>>>>>> parent of 691af95... Removed React.StrictMode, solved bug in ReusableDatatable that failed to Next data
);

reportWebVitals();
