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

const RoutesComponent = () => {
    return (
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
                <Route path="/admin/dashboard" element={<AdminRoute component={AdminDashboard} />} />

                {/* <Route path="/user/dashboard" element={<PrivateRoute />}>
                    <Route path="" element={<UserDashboard />} />
                </Route>
                <Route path="/admin/dashboard" element={<AdminRoute />}>
                    <Route path="" element={<AdminDashboard />} />
                </Route> */}
            </Routes>
        </Router>
    );
};

export default RoutesComponent;
