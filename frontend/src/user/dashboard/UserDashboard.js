import React, { useState, useEffect } from 'react';
import { useAuth } from '../../api/authHook';
import { getUserPrayerStats } from '../../api/user';
import CRMDashboard2 from '../../components/dashboards/crm/crmdashboard2/CRMDashboard2';

const UserDashboard = () => {
  const [userStats, setUserStats] = useState({
    rosaries: 0,
    masses: 0,
    divineMercies: 0
  });
  const { user, token } = useAuth();

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
      <div className="row">
        <CRMDashboard2 userStats={userStats} />
      </div>
    </div>
  );
};

export default UserDashboard;
