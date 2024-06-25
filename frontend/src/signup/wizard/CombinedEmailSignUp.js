import React, { useEffect } from 'react';
import debounce from "lodash.debounce";

const CombinedEmailSignUp = ({ userData, setUserData, nextStep, prevStep, handleKeyPress, checkUsername }) => {
    const debouncedCheckUsername = debounce((value) => {
        if (value) {
            checkUsername(value);
        }
    }, 1000);

    useEffect(() => {
        if (userData.username && userData.username.length > 0) {
            debouncedCheckUsername(userData.username);
        }
        return () => {
            debouncedCheckUsername.cancel();
        };
    }, [userData.username, debouncedCheckUsername]);

    const renderUsernameAvailabilityMessage = () => {
        if (userData.username && userData.username.length > 0) {
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
        setUserData({ ...userData, [input]: value });
        if (input === 'username') {
            debouncedCheckUsername(value);
        }
    };

    const nextStep0 = () => {
        if (userData.username.trim() !== '') {
            nextStep();
        }
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={userData.username}
                    onChange={handleChange('username')}
                    onKeyPress={handleKeyPress}
                />
                {renderUsernameAvailabilityMessage()}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={userData.email}
                    onChange={handleChange('email')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={userData.password}
                    onChange={handleChange('password')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                />
            </div>
            <button className="btn btn-primary" onClick={prevStep}>Back</button>
            <button 
                className="btn btn-primary" 
                onClick={nextStep0}
                disabled={userData.username.trim() === '' || userData.usernameAvailable === false}
            >
                Next
            </button>
        </div>
    );
};

export default CombinedEmailSignUp;
