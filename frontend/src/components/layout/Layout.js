import React, { useEffect, useState } from 'react';
import NavbarMain from '../../NavbarMain';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../../Footer';
import BottomBar from '../bottombar/BottomBar';
import { Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';
import { getUserPrayerStats } from '../../api/user';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userStats, setUserStats] = useState({ rosaries: 0, masses: 0, confessions: 0, divineMercies: 0 });

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const { user: { _id: userId }, token } = isAuthenticated();
        const stats = await getUserPrayerStats(userId, token);
        setUserStats(stats);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  const shouldShowFooter = !isMobile || (isMobile && location.pathname === '/user/settings');

  return (
    <div className="layout-wrapper">
      <div className="navbar-fixed">
        <NavbarMain userStats={userStats} />
      </div>
      <div className="layout-container">
        {!isMobile && (
          <div className="sidebar-fixed">
            <Sidebar />
          </div>
        )}
        <div className="layout-content">
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </div>
      {isMobile && (
        <div className="bottombar-fixed">
          <BottomBar />
        </div>
      )}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;
