import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaCog, FaCross, FaPray, FaChurch } from 'react-icons/fa';
import { isAuthenticated } from '../../../api/auth';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/numberFormatter';

const ProfileIcon = ({ handleSignout, userStats = {} }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = isAuthenticated();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={dropdownRef}>
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
          borderRadius: '12px',
          width: '200px',
          zIndex: '1000'
        }}>
          <div style={{ padding: '10px', fontWeight: 'bold' }}>{user ? user.username : 'User Name'}</div>
          <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
            <Link to="/prayers/rosary" style={{ textAlign: 'center', textDecoration: 'none', color: 'black' }}>
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
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: '1px solid black'
                  }}>{formatNumber(userStats.rosaries || 0)}</span>
                </div>
              </div>
            </Link>
            <Link to="/prayers/mass" style={{ textAlign: 'center', textDecoration: 'none', color: 'black' }}>
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
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: '1px solid black'
                  }}>{formatNumber(userStats.masses || 0)}</span>
                </div>
              </div>
            </Link>
            <Link to="/prayers/confession" style={{ textAlign: 'center', textDecoration: 'none', color: 'black' }}>
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
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: '1px solid black'
                  }}>{formatNumber(userStats.confessions || 0)}</span>
                </div>
              </div>
            </Link>
          </div>
          <div style={{ height: '1px', backgroundColor: '#ddd', margin: '5px 0' }}></div>
          <Link to="/user/settings" style={{ padding: '10px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <FaCog size={16} /> &nbsp;&nbsp;Settings
          </Link>
          <div style={{ padding: '10px', color: '#c0392b', cursor: 'pointer' }} onClick={handleSignout}>
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
