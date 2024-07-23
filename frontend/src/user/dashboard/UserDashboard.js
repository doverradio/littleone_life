import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../api/auth';
import { getUserPrayerStats } from '../../api/user';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [userStats, setUserStats] = useState({});
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const stats = await getUserPrayerStats(user._id, token);
        setUserStats(stats);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, [user._id, token]);

  return (
    <div className="container">
      <h1 className="my-4">User Dashboard</h1>
      <div className="card mb-4">
        <div className="card-header">
          <h4>User Stats</h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/prayers/rosary" style={{ textDecoration: 'none', color: 'inherit' }}>
                Rosaries: {userStats.rosaries || 0}
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/prayers/mass" style={{ textDecoration: 'none', color: 'inherit' }}>
                Masses: {userStats.masses || 0}
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/prayers/confession" style={{ textDecoration: 'none', color: 'inherit' }}>
                Confessions: {userStats.confessions || 0}
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/prayers/divinemercy" style={{ textDecoration: 'none', color: 'inherit' }}>
                Divine Mercy Chaplets: {userStats.divineMercies || 0}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
