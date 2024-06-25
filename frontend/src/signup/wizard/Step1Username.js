import React, { useEffect } from 'react';
import debounce from "lodash.debounce";

const Step1Username = ({ userData, setUserData, nextStep0, usernameEmpty, setUsernameEmpty, handleKeyPress, checkUsername }) => {
    const debouncedCheckUsername = debounce(checkUsername, 1000);

    useEffect(() => {
        if (userData && userData.username.length > 0) {
            debouncedCheckUsername();
        }
        return () => {
            debouncedCheckUsername.cancel();
        };
    }, [userData.username, debouncedCheckUsername]);

    const renderUsernameAvailabilityMessage = () => {
        if (userData.username.length > 0) {
            if (userData.usernameAvailable === false) {
                return <p style={{ color: 'red' }}>{userData.username} is not available</p>;
            } else if (userData.usernameAvailable === true) {
                return <p style={{ color: 'green' }}>{userData.username} is available</p>;
            }
        }
        return <p style={{ height: '1rem' }}>&nbsp;</p>;
    };

    const handleChange = (input) => (e) => {
        let value = e.target.value;
        if (input === 'username' && usernameEmpty) {
            setUsernameEmpty(false);
        }
        setUserData({ ...userData, [input]: value });
    };

    return (
        <div className="row">
            <div className="col-12">
                {renderUsernameAvailabilityMessage()}
                {usernameEmpty && <p style={{ color: 'red' }}>Please enter a username to proceed</p>}
                <input 
                    type="text" 
                    value={userData.username} 
                    onChange={handleChange('username')} 
                    className='form-control'
                    placeholder="Username"
                    onKeyPress={handleKeyPress}
                />
                {userData.usernameError && <p style={{ color: 'red' }}>{userData.usernameError}</p>}
                <button 
                    className="btn btn-primary btn-block m-1" 
                    onClick={nextStep0}
                    disabled={userData.username.trim() === '' || userData.usernameAvailable === false}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step1Username;
