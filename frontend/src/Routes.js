import React from 'react';
import ReactDOM from 'react-dom/client'; // Add this import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import AboutUs from './AboutUs';
import SignIn from './SignIn';
import SignUp from './Signup';
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
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />                    
                    <Route path="/user/dashboard" element={<PrivateRoute component={UserDashboard} />} />
                    <Route path="/user/settings" element={<PrivateRoute component={Settings} />} />
                    <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboard} />} />
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
