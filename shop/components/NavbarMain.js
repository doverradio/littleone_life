import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signOut } from '../utils/session';
import ProfileIcon from './ProfileIcon';
import SearchBar from './SearchBar';
import UserProfile from './UserProfile';
import CartIcon from './CartIcon';
import NotificationBell from './NotificationBell'; // Import the NotificationBell component

const NavbarMain = ({ userStats }) => {
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session && session.user) {
        setUser(session.user);
        // Replace with logic to fetch the actual cart count and notifications for the user
        setCartItemCount(3); // Example count
        setNotifications([
          { message: 'You have a new bid', link: '/bids' },
          { message: 'Your item has been sold', link: '/purchases' }
        ]); // Example notifications
      } else {
        setUser(null);
        setCartItemCount(2); // Example count for non-logged-in users
        setNotifications([]); // No notifications for non-logged-in users
      }
    }

    fetchSession();
  }, []);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link href="/">
          <div className="navbar-brand d-flex align-items-center" style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="logo" className="logo-img" style={{ height: '40px', width: 'auto' }} />
          </div>
        </Link>

        <SearchBar />

        <div className="d-flex align-items-center">
          <CartIcon cartItemCount={cartItemCount} />
          <NotificationBell notifications={notifications} /> {/* Add NotificationBell here */}
          {user ? (
            <UserProfile user={user} />
          ) : (
            <>
              <Link href="/signup" legacyBehavior>
                <a className="nav-link custom-link">Sign Up</a>
              </Link>
              <Link href="/signin" legacyBehavior>
                <a className="nav-link custom-link">Sign In</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
