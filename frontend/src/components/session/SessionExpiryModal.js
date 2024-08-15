// frontend/src/components/session/SessionExpiryModal.js
import React from 'react';
import Modal from 'react-modal';

// Set the root element of your app for accessibility
Modal.setAppElement('#root');

const SessionExpiryModal = ({ isOpen, onRefresh, onLogout }) => {
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
      <p>Your session is about to expire.</p>
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
