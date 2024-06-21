import React from 'react';
import ReactDOM from 'react-dom/client'; // Add this import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import AboutUs from './AboutUs';
import SignIn from './SignIn';
import SignUp from './signup/Signup';
import TermsOfService from './TermsOfService';
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Settings from "./components/settings/Settings";
import { ModalProvider } from "./context/ModalContext";

const RoutesComponent = () => {
    return (
        <ModalProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} exact />
                    <Route path="/about" element={<AboutUs />} exact />
                    <Route path="/signin" element={<SignIn />} exact />
                    <Route path="/signup" element={<SignUp />} exact />
                    <Route path="/terms" element={<TermsOfService />} exact />
                    <Route path="/contact" element={<Contact />} exact />
                    <Route path="/privacy" element={<PrivacyPolicy />} exact />
                    <Route path="/user/dashboard" element={<PrivateRoute component={UserDashboard} />} exact />
                    <Route path="/user/settings" element={<PrivateRoute component={Settings} />} exact />
                    <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboard} />} exact />
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
