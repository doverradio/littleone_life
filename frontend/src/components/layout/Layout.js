import React, { useEffect, useState } from 'react';
import NavbarMain from '../../NavbarMain';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../../Footer';
import BottomBar from '../bottombar/BottomBar';
import './Layout.css';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const shouldShowFooter = !isMobile || (isMobile && location.pathname === '/user/settings');

    return (
        <div className="layout-wrapper">
            <NavbarMain />
            <div className="layout-container">
                {!isMobile && <Sidebar />} {/* Only show sidebar on desktop */}
                <div className="layout-content">
                    <Outlet /> {/* This will render the nested routes */}
                </div>
            </div>
            {isMobile && <BottomBar />} {/* Only show bottom bar on mobile */}
            {shouldShowFooter && <Footer />}
        </div>
    );
};

export default Layout;
