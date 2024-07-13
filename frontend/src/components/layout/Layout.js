import React from 'react';
import NavbarMain from '../../NavbarMain';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../../Footer';
import BottomBar from '../bottombar/BottomBar';
import './Layout.css';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const shouldShowFooter = !isMobile || (isMobile && location.pathname === '/user/settings');

    return (
        <div className="layout-wrapper">
            <NavbarMain />
            <div className="layout-container">
                <Sidebar />
                <div className="layout-content">
                    <Outlet /> {/* This will render the nested routes */}
                </div>
            </div>
            <BottomBar />
            {shouldShowFooter && <Footer />}
        </div>
    );
};

export default Layout;
