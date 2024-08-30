import React, { useEffect, useState } from 'react';
import NavbarMain from '../../NavbarMain';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../../Footer';
import BottomBar from '../bottombar/BottomBar';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../api/authHook';
import { getUserPrayerStats } from '../../api/user';
import ChatIcon from '../ai/ChatIcon'; // Import the ChatIcon component
import './Layout.css';

const Layout = () => {
  
  // Ensure the user is authenticated
  const { user } = useAuth();
  const { _id } = user || {};
  const userId = _id;

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
      if (userId) {  // Ensure userId and token are available before making the request
        try {
          const stats = await getUserPrayerStats(userId);
          setUserStats(stats);
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      }
    };

    fetchUserStats();
  }, [userId]);  // Add userId and token as dependencies

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
      {userId && <ChatIcon userId={userId} />} {/* Add ChatIcon here */}
    </div>
  );
};

export default Layout;
