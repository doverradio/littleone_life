// frontend/src/components/session/SessionExpiryModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const SessionExpiryModal = ({ isOpen, onRefresh, onLogout }) => {
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds countdown

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(15); // Reset the timer whenever the modal opens

      const countdownInterval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(countdownInterval);
            onLogout(); // Log out the user when the countdown reaches 0
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Countdown every second

      return () => clearInterval(countdownInterval); // Cleanup interval on unmount or close
    }
  }, [isOpen, onLogout]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRefresh}
      contentLabel="Session Expiry Warning"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          padding: '20px',
          textAlign: 'center',
          zIndex: 1000,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        },
      }}
    >
      <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Session Expiry Warning</h2>
      <p>Your session is about to expire in {timeLeft} seconds.</p>
      <button
        onClick={onRefresh}
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          margin: '10px',
          cursor: 'pointer',
        }}
      >
        OK
      </button>
      <button
        onClick={onLogout}
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          margin: '10px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </Modal>
  );
};

export default SessionExpiryModal;
