import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationBell = ({ notifications }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-link position-relative"
        type="button"
        id="notificationDropdown"
        onClick={toggleDropdown}
        aria-expanded={dropdownOpen}
      >
        <FontAwesomeIcon icon={faBell} size="lg" />
        {notifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notifications.length}
            <span className="visually-hidden">unread notifications</span>
          </span>
        )}
      </button>
      <ul
        className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
        aria-labelledby="notificationDropdown"
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index}>
              <Link href={notification.link} className="dropdown-item">
                {notification.message}
              </Link>
            </li>
          ))
        ) : (
          <li>
            <span className="dropdown-item">No new notifications</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NotificationBell;
