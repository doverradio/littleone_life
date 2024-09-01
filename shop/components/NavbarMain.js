// shop/components/NavbarMain.js

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signOut } from '../utils/session'; // utility to interact with the session
import ProfileIcon from './ProfileIcon'; // Create a similar ProfileIcon component for Next.js

const NavbarMain = ({ userStats }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession(); // Fetch session details from the backend
      if (session && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    }

    fetchSession();
  }, []);

  const handleSignout = async () => {
    await signOut();
    setUser(null);
    router.push('/signin');
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/logo.png" alt="logo" className="logo-img" style={{ height: '40px', width: 'auto' }} />
          </a>
        </Link>
        <div className="d-flex align-items-center">
          {user ? (
            <>
              {user.role === 1 && (
                <Link href="/admin/dashboard">
                  <a className="nav-link dashboard-link">Admin Dashboard</a>
                </Link>
              )}
              {user.role === 0 && (
                <Link href="/user/dashboard">
                  <a className="nav-link dashboard-link">Dashboard</a>
                </Link>
              )}
              <ProfileIcon handleSignout={handleSignout} userStats={userStats} />
            </>
          ) : (
            <>
              <Link href="/signup">
                <a className="nav-link">Sign Up</a>
              </Link>
              <Link href="/signin">
                <a className="nav-link">Sign In</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
