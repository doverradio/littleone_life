import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const TestDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        console.log('Dropdown toggled'); // Debug log
        setDropdownOpen(prevState => !prevState);
        console.log('Dropdown open state:', !dropdownOpen); // Debug log
    };

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }} onClick={toggleDropdown}>
                <FaUserCircle size={30} />
            </span>
            {dropdownOpen && (
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                    width: '200px',
                    zIndex: '1000'
                }}>
                    {console.log('Dropdown menu rendered')} {/* Debug log */}
                    <div style={{ padding: '10px' }}>User Name</div>
                    <div style={{ padding: '10px' }}>user@example.com</div>
                    <div style={{ height: '1px', backgroundColor: '#ddd', margin: '5px 0' }}></div>
                    <div style={{ padding: '10px' }}>Settings</div>
                    <div style={{ padding: '10px', color: '#c0392b' }}>Sign Out</div>
                </div>
            )}
        </div>
    );
};

export default TestDropdown;
