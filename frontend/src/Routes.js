// frontend/src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import SignIn from './signin/SignIn';
import SignUp from './signup/Signup';
import TermsOfService from './TermsOfService';
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from './user/dashboard/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';
import Settings from './components/settings/Settings';
import AboutPage from './AboutPage';
import Shop from './shop/Shop';
import Works from './works/Works';
import Prayers from './prayers/Prayers';
import Social from './social/Social';
import Layout from './components/layout/Layout';
import PrayerSpace from './components/prayerspace/PrayerSpace';
import Rosary from './components/rosary/Rosary';
import Mass from './components/mass/Mass';
import Confession from './components/confession/Confession';
import DivineMercy from './components/otherprayers/divinemercy/DivineMercy';
import StMichaelPrayer from './components/otherprayers/stmichaelprayer/StMichaelPrayer';
import StFrancisPrayer from './components/otherprayers/stfrancis/StFrancisPrayer';
import StLeandroRuizPrayer from './components/otherprayers/stleandroruiz/StLeandroRuiz';
import PrayerSettings from './components/otherprayers/PrayerSettings';

const RoutesComponent = () => {
  return (
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
          <Route path="/prayerspace/:id" element={<PrivateRoute component={PrayerSpace} />} exact />
          
          {/* Prayer Routes */}
          <Route path="/prayers/rosary" element={<PrivateRoute component={Rosary} />} exact />
          <Route path="/prayers/mass" element={<PrivateRoute component={Mass} />} exact />
          <Route path="/prayers/confession" element={<PrivateRoute component={Confession} />} exact />
          <Route path="/prayers/divinemercy" element={<PrivateRoute component={DivineMercy} />} exact />
          <Route path="/prayers/stmichael" element={<PrivateRoute component={StMichaelPrayer} />} exact />
          <Route path="/prayers/stfrancis" element={<PrivateRoute component={StFrancisPrayer} />} exact />
          <Route path="/prayers/stleandroruiz" element={<PrivateRoute component={StLeandroRuizPrayer} />} exact />
          <Route path="/prayers/settings" element={<PrivateRoute component={PrayerSettings} />} exact />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
