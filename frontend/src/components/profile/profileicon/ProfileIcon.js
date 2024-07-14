import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaCog, FaCross, FaPray, FaChurch } from 'react-icons/fa'; // Import necessary icons
import { isAuthenticated } from '../../../api/auth';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/numberFormatter'; // Correct import path for the number formatting function

const ProfileIcon = ({ handleSignout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage the dropdown visibility
    const { user } = isAuthenticated(); // Get the authenticated user details
    const dropdownRef = useRef(null); // Ref to the dropdown element for click outside detection

    // Example counts (replace these with actual data as needed)
    const rosaryCount = 204000; // Example count for rosaries
    const massCount = 21400; // Example count for masses
    const confessionCount = 221900000; // Example count for confessions

    // Debug log to check user details
    // console.log('Authenticated user:', user);

    // Function to toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    // Function to handle clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    // Add event listener to handle clicks outside the dropdown
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={dropdownRef}>
            <span style={{ cursor: 'pointer' }} onClick={toggleDropdown}>
                <FaUserCircle size={30} /> {/* Profile icon */}
            </span>
            {dropdownOpen && (
                <div style={{
                    position: 'absolute',
                    top: '40px', // Position the dropdown below the icon
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px', // Curved corners
                    width: '200px',
                    zIndex: '1000'
                }}>
                    <div style={{ padding: '10px', fontWeight: 'bold' }}>{user ? user.username : 'User Name'}</div> {/* Display user username */}
                    <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ position: 'relative', textAlign: 'center' }}>
                            <FaCross size={20} title="Rosaries" />
                            <div>
                                <sup>Rosaries</sup>
                                <span style={{
                                    display: 'inline-block',
                                    marginTop: '5px',
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    padding: '2px 8px',
                                    color: 'black',
                                    fontSize: '14px', // Increase font size for better readability
                                    fontWeight: 'bold', // Make the font bold
                                    border: '1px solid black'
                                }}>{formatNumber(rosaryCount)}</span>
                            </div>
                        </div>
                        <div style={{ position: 'relative', textAlign: 'center' }}>
                            <FaChurch size={20} title="Masses" />
                            <div>
                                <sup>Masses</sup>
                                <span style={{
                                    display: 'inline-block',
                                    marginTop: '5px',
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    padding: '2px 8px',
                                    color: 'black',
                                    fontSize: '14px', // Increase font size for better readability
                                    fontWeight: 'bold', // Make the font bold
                                    border: '1px solid black'
                                }}>{formatNumber(massCount)}</span>
                            </div>
                        </div>
                        <div style={{ position: 'relative', textAlign: 'center' }}>
                            <FaPray size={20} title="Confessions" />
                            <div>
                                <sup>Confessions</sup>
                                <span style={{
                                    display: 'inline-block',
                                    marginTop: '5px',
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    padding: '2px 8px',
                                    color: 'black',
                                    fontSize: '14px', // Increase font size for better readability
                                    fontWeight: 'bold', // Make the font bold
                                    border: '1px solid black'
                                }}>{formatNumber(confessionCount)}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '1px', backgroundColor: '#ddd', margin: '5px 0' }}></div> {/* Divider */}
                    <Link to="/user/settings" style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                        <FaCog size={16} /> Settings {/* Link to user settings */}
                    </Link>
                    <div style={{ padding: '10px', color: '#c0392b', cursor: 'pointer' }} onClick={handleSignout}>
                        Sign Out {/* Sign out option */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
