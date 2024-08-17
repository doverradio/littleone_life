// src/admin/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import NotificationEmailSender from './NotificationEmailSender';
import UsersList from './UsersList';
import { getUsers } from '../api/admin';
import { useAuth } from '../api/authHook';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showEmailSender, setShowEmailSender] = useState(false);
  const [showUsersList, setShowUsersList] = useState(true);
  const { token } = useAuth(); // Get the token from context

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error('No token available');
        return;
      }

      try {
        const fetchedUsers = await getUsers(token); // Pass the token to getUsers
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [token]); // Add token as a dependency to useEffect

  return (
    <div className="admin-dashboard">
      <button onClick={() => setShowEmailSender(!showEmailSender)}>
        {showEmailSender ? 'Hide Email Sender' : 'Show Email Sender'}
      </button>
      <button onClick={() => setShowUsersList(!showUsersList)}>
        {showUsersList ? 'Hide Users List' : 'Show Users List'}
      </button>
      {showEmailSender && <NotificationEmailSender />}
      {showUsersList && <UsersList users={users} />}
    </div>
  );
};

export default AdminDashboard;
