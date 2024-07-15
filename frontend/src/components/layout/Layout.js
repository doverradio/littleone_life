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
        <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1100 }}>
                <NavbarMain />
            </div>
            <div className="layout-container" style={{ display: 'flex', flex: 1, marginTop: '60px' }}>
                {!isMobile && (
                    <div style={{ width: '250px', position: 'fixed', top: '60px', bottom: 0 }}>
                        <Sidebar />
                    </div>
                )}
                <div className="layout-content" style={{ flex: 1, paddingLeft: !isMobile ? '250px' : '0', paddingTop: '20px' }}>
                    <Outlet /> {/* This will render the nested routes */}
                </div>
            </div>
            {isMobile && (
                <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1100 }}>
                    <BottomBar />
                </div>
            )}
            {shouldShowFooter && <Footer />}
        </div>
    );
};

export default Layout;
