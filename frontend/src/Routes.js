import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./MainPage";
import AboutUs from "./AboutUs";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import TermsOfService from "./TermsOfService";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Settings from "./components/settings/Settings";
import { ModalProvider } from "./context/ModalContext";
import Self from "./user/Self";
import Society from "./user/Society";

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

                    {/* User */}
                    <Route path="/user/dashboard" element={<PrivateRoute component={UserDashboard} />} />
                    <Route path="/user/self" element={<PrivateRoute component={Self} />} />
                    <Route path="/user/society" element={<PrivateRoute component={Society} />} />
                    <Route path="/user/settings" element={<PrivateRoute component={Settings} />} />

                    {/* Admin */}
                    <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboard} />} />
                </Routes>
            </Router>
        </ModalProvider>
    );
};

export default RoutesComponent;
