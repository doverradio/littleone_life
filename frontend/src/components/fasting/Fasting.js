import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './Fasting.css';

const Fasting = () => {
  const { user } = useUser();
  const userId = user?._id;

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch fasting data for the user, this could be from an API
    // Simulate an API call for now
    const fetchFastingCount = async () => {
      setLoading(true);
      try {
        // Replace this with actual API call
        setCount(10); // Example data
      } catch (error) {
        console.error('Error fetching fasting data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFastingCount();
  }, [userId]);

  return (
    <div className="fasting-component">
      <h2>Fasting</h2>
      {loading ? <p>Loading...</p> : <p>You have fasted {count} days this month.</p>}
    </div>
  );
};

export default Fasting;
