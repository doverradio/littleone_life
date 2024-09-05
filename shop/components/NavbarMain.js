import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSession } from '../utils/session';
import ProfileIcon from './ProfileIcon';
import SearchBar from './SearchBar';
import UserProfile from './UserProfile';
import CartIcon from './CartIcon';
import NotificationBell from './NotificationBell';
import Image from 'next/image';

const NavbarMain = () => {
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session && session.user) {
        setUser(session.user);
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
        <Link href="/" passHref>
          <a className="navbar-brand d-flex align-items-center">
            <Image src="/logo.png" alt="logo" className="logo-img" width={40} height={40} />
          </a>
        </Link>

        <SearchBar />

        <div className="d-flex align-items-center">
          <CartIcon cartItemCount={cartItemCount} />
          <NotificationBell notifications={notifications} />
          {user ? (
            <UserProfile user={user} />
          ) : (
            <>
              <Link href="/signup">
                <a className="nav-link custom-link">Sign Up</a>
              </Link>
              <Link href="/signin">
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
