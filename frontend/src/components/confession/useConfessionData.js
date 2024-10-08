// src/components/confession/useConfessionData.js

import { useState, useEffect } from 'react';
import { getAllConfessions, getUserConfessions } from '../../api/confession';
import { getAllChurches } from '../../api/church';
import { useAuth } from '../../api/authHook';

export const useConfessionData = () => {
  
  const { user, token } = useAuth();
  const { _id } = user || {};

  const [confessions, setConfessions] = useState([]);
  const [userChurches, setUserChurches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const confessionData = await getAllConfessions(_id, token);
        const churchData = await getAllChurches(_id, token);

        setConfessions(confessionData || []);
        setUserChurches(churchData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [_id, token]);

  // Return both state and setter function for confessions
  return { confessions, setConfessions, userChurches };
};
