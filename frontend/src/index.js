import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './styles/base.scss'
import reportWebVitals from './reportWebVitals';
import RoutesComponent from './Routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/ModalContext';
import { PrayerSettingsProvider } from './context/PrayerSettingsContext';

if (module.hot) {
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <ModalProvider>
          <PrayerSettingsProvider>
            <RoutesComponent />
          </PrayerSettingsProvider>
        </ModalProvider>
      </GoogleOAuthProvider>
    </UserProvider>
);

reportWebVitals();
