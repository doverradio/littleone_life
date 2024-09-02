import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut } from '../utils/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/signin');
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="userDropdown"
        onClick={toggleDropdown}
        aria-expanded={dropdownOpen}
      >
        <FontAwesomeIcon icon={faUser} style={{ height: '30px', width: '30px' }} />
        {user && <span className="ms-2">{user.username}</span>}
      </button>
      <ul
        className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
        aria-labelledby="userDropdown"
      >
        {user && (
          <>
            <li>
              <Link href="/dashboard">
                <a className="dropdown-item">Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a className="dropdown-item">Account Settings</a>
              </Link>
            </li>
            <li>
              <Link href="/notifications">
                <a className="dropdown-item">Notifications</a>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
