// shop/pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // Ensure this path is correct

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
