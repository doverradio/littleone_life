// src/components/ai/ChatIcon.js

import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa'; // Import an icon for the chat button
import AiInteraction from './AiInteraction'; // Import the AI interaction component

const ChatIcon = ({ userId, token }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div 
                style={{
                    position: 'fixed',
                    bottom: '90px', // Increased margin from the bottom
                    right: '20px', 
                    zIndex: 9999, // High z-index to ensure visibility
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    borderRadius: '50%',
                    padding: '15px',
                    color: 'white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={toggleChat}
            >
                <FaComments size={24} />
            </div>

            {isOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        bottom: '150px', // Adjusted margin from the bottom to keep the chat box above the icon
                        right: '20px',
                        zIndex: 9999, 
                        width: '300px',
                        height: '400px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <AiInteraction userId={userId} token={token} onClose={toggleChat} />
                </div>
            )}
        </div>
    );
};

export default ChatIcon;
