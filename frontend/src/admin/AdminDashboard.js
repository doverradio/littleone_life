// src/admin/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import NotificationEmailSender from './NotificationEmailSender';
import UsersList from './UsersList';
import { getUsers } from '../api/admin';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showEmailSender, setShowEmailSender] = useState(false);
  const [showUsersList, setShowUsersList] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers(); // No need to pass the token
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array, fetch users only once when component mounts

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
