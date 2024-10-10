import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import Loader from 'react-loaders';

const Step1Username = ({
    userData = {}, 
    setUserData,
    nextStep0,
    usernameEmpty,
    setUsernameEmpty,
    handleKeyPress,
    checkUsername
}) => {
    const [isChecking, setIsChecking] = useState(false); // Track loading state
    const [lastCheckedUsername, setLastCheckedUsername] = useState(''); // Track last checked username

    // Debounce function inside useEffect
    useEffect(() => {
        const debouncedCheckUsername = debounce(async (username) => {
            if (username && username.trim() && username !== lastCheckedUsername) {
                setIsChecking(true); // Start the loader
                await checkUsername();
                setLastCheckedUsername(username); // Update the last checked username
                setIsChecking(false); // Stop the loader after receiving a response
            }
        }, 1000);

        if (userData.username && userData.username.length > 0 && userData.username !== lastCheckedUsername) {
            debouncedCheckUsername(userData.username);
        }

        // Cleanup debounce when component unmounts or updates
        return () => {
            debouncedCheckUsername.cancel();
        };
    }, [userData.username, lastCheckedUsername, checkUsername]);

    // Handle input changes and update userData state
    const handleChange = (input) => (e) => {
        const value = e.target.value;
        if (input === 'username' && usernameEmpty) {
            setUsernameEmpty(false); // Reset the usernameEmpty flag when the user starts typing
        }
        setUserData((prevData) => ({ ...prevData, [input]: value }));
    };

    // Render a message showing whether the username is available or not
    const renderUsernameAvailabilityMessage = () => {
        if (isChecking) {
            return (
                <div className="d-flex justify-content-center align-items-center">
                    <Loader type="ball-beat" color="#3f6ad8" />
                </div>
            );
        }

        if (userData.username && userData.username.length > 0) {
            if (userData.usernameAvailable === false) {
                return <p style={{ color: 'red' }}>{userData.username} is not available</p>;
            } else if (userData.usernameAvailable === true) {
                return <p style={{ color: 'green' }}>{userData.username} is available</p>;
            }
        }
        return <p style={{ height: '1rem' }}>&nbsp;</p>; // Placeholder for layout consistency
    };

    return (
        <div className="row">
            <div className="col-12">
                {renderUsernameAvailabilityMessage()}
                {usernameEmpty && <p style={{ color: 'red' }}>Please enter a username to proceed</p>}
                <input
                    type="text"
                    value={userData.username || ''} // Ensure the input is controlled, defaulting to an empty string
                    onChange={handleChange('username')}
                    className="form-control"
                    placeholder="Username with no spaces"
                    onKeyPress={handleKeyPress}
                />
                {userData.usernameError && <p style={{ color: 'red' }}>{userData.usernameError}</p>}
                {/* <button
                    className="btn btn-primary btn-block m-1"
                    onClick={nextStep0}
                    disabled={!userData.username?.trim() || userData.usernameAvailable === false}
                >
                    Next
                </button> */}
            </div>
        </div>
    );
};

export default Step1Username;
