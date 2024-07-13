import React from 'react';
import ReactDOM from 'react-dom/client'; // Add this import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
// import AboutUs from './AboutUs';
import SignIn from './signin/SignIn';
import SignUp from './signup/Signup';
import TermsOfService from './TermsOfService';
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from "./user/dashboard/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Settings from "./components/settings/Settings";
import { ModalProvider } from "./context/ModalContext";
import AboutPage from './AboutPage';
import Shop from './shop/Shop';
import Works from './works/Works';
import Prayers from './prayers/Prayers';
import Social from './social/Social';
import Layout from './components/layout/Layout';

const RoutesComponent = () => {
    return (
        <ModalProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} exact />
                    <Route path="/about" element={<AboutPage />} exact />
                    <Route path="/signin" element={<SignIn />} exact />
                    <Route path="/signup" element={<SignUp />} exact />
                    <Route path="/terms" element={<TermsOfService />} exact />
                    <Route path="/contact" element={<Contact />} exact />
                    <Route path="/privacy" element={<PrivacyPolicy />} exact />

                    {/* Routes with Layout */}
                    <Route element={<Layout />}>
                        <Route path="/user/dashboard" element={<PrivateRoute component={UserDashboard} />} exact />
                        <Route path="/user/settings" element={<PrivateRoute component={Settings} />} exact />
                        <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboard} />} exact />
                        <Route path="/shop" element={<PrivateRoute component={Shop} />} exact />
                        <Route path="/works" element={<PrivateRoute component={Works} />} exact />
                        <Route path="/prayers" element={<PrivateRoute component={Prayers} />} exact />
                        <Route path="/social" element={<PrivateRoute component={Social} />} exact />
                    </Route>
                </Routes>
            </Router>
        </ModalProvider>
    );
};

export default RoutesComponent;

if (module.hot) {
    module.hot.accept('./Routes', () => {
        const NextRoutes = require('./Routes').default;
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <NextRoutes />
            </React.StrictMode>
        );
    });
}
