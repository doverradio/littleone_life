// shop/pages/layout.js
import React, { useEffect, useState } from 'react';
import NavbarMain from '../components/NavbarMain';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer'; // Import the Footer component
import { getSession } from '../utils/session';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    }

    fetchSession();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarMain />
      <div className="d-flex flex-grow-1">
        {user && <Sidebar />}  {/* Render the sidebar only if the user is logged in */}
        <div className="content flex-grow-1">
          <main>{children}</main>
        </div>
      </div>
      <Sidebar /> {/* Comment this out when you have user login set up. */}
      <Footer /> {/* Add the Footer component at the bottom */}
    </div>
  );
};

export default Layout;
