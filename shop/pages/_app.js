// shop/pages/_app.js
import 'tailwindcss/tailwind.css'; // Tailwind CSS
import '../styles/globals.css'; // Global CSS
import 'aos/dist/aos.css'; // AOS CSS
import 'react-range-slider-input/dist/style.css'; // Slider CSS

import { useEffect } from 'react';
import AOS from 'aos';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init(); // Initialize AOS on client-side
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
