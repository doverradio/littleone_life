// src/components/notifications/DisableNotification.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DisableNotification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const component = params.get('component');

    if (userId && component) {
      fetch(`/api/disable-notifications?userId=${userId}&component=${component}`)
        .then(response => {
          if (response.ok) {
            toast.success('Notifications disabled successfully.');
            navigate('/'); // Redirect to the homepage or another page
          } else {
            throw new Error('Failed to disable notifications.');
          }
        })
        .catch(error => {
          console.error('Error disabling notification:', error);
          toast.error('Failed to disable notifications.');
          navigate('/'); // Redirect to the homepage or another page
        });
    } else {
      toast.error('Invalid request.');
      navigate('/'); // Redirect to the homepage or another page
    }
  }, [navigate]);

  return (
    <div>
      <p>Processing your request...</p>
    </div>
  );
};

export default DisableNotification;
