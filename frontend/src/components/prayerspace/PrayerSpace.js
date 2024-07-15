import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
import './PrayerSpace.css';
import { FaBell } from 'react-icons/fa'; // Importing the bell icon for notifications

// const socket = io('http://localhost:8000'); // Ensure this matches your server's address

const PrayerSpace = ({ spaceName, spaceId }) => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch users in the space from the backend
        // This is just a placeholder, replace with actual API call
        setUsers([
            { id: 1, name: 'User1', role: 'Listener' },
            { id: 2, name: 'User2', role: 'Speaker' },
            // Add more users as needed
        ]);

        // socket.emit('joinSpace', spaceId);

        // socket.on('message', (data) => {
        //     setMessages((prevMessages) => [...prevMessages, data]);
        // });

        return () => {
            // socket.off('message');
        };
    }, [spaceId]);

    const sendMessage = () => {
        // socket.emit('message', { spaceId, text: message });
        setMessage('');
    };

    return (
        <div className="prayer-space">
            <div className="space-header">
                <h2>{spaceName}</h2>
                <button className="leave-button">Leave</button>
            </div>
            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user">
                        <img src={`https://api.adorable.io/avatars/50/${user.name}.png`} alt={user.name} />
                        <div className="user-info">
                            <p>{user.name}</p>
                            <span>{user.role}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default PrayerSpace;
