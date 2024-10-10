import React, { useEffect } from 'react';
import { debounce } from 'lodash';
import { useUser } from '../../context/UserContext';

const CombinedEmailSignUp = ({ nextStep, prevStep, checkUsername, handleKeyPress, setUsernameEmpty, usernameEmpty }) => {
    const { user, setUser } = useUser(); // Get the user and setUser from context

    // Debounce checkUsername with a 1-second delay to prevent excessive API calls
    const debouncedCheckUsername = debounce(() => {
        if (user.username.trim()) {
            checkUsername();
        }
    }, 1000);

    useEffect(() => {
        // Only call the debounced function when the username changes
        if (user.username && user.username.length > 0) {
            debouncedCheckUsername(); // Trigger the debounced function
        }
        return () => {
            debouncedCheckUsername.cancel(); // Clean up the debounced function on unmount or username change
        };
    }, [user.username, debouncedCheckUsername]);

    // Function to handle changes in input fields
    const handleChange = (input) => (e) => {
        const value = e.target.value;
        if (input === 'username' && usernameEmpty) {
            setUsernameEmpty(false);
        }
        setUser({ ...user, [input]: value }); // Use setUser from context to update user data
    };

    // Render username availability message
    const renderUsernameAvailabilityMessage = () => {
        if (user.username && user.username.length > 0) {
            if (user.usernameAvailable === false) {
                return <p style={{ color: 'red' }}>{user.username} is not available</p>;
            } else if (user.usernameAvailable === true) {
                return <p style={{ color: 'green' }}>{user.username} is available</p>;
            }
        }
        return <p style={{ height: '1rem' }}>&nbsp;</p>; // Empty space to maintain layout consistency
    };

    return (
        <div className="row">
            <div className="col-12">
                {renderUsernameAvailabilityMessage()}
                {usernameEmpty && <p style={{ color: 'red' }}>Please enter a username to proceed</p>}
                <input 
                    type="text" 
                    value={user.username} 
                    onChange={handleChange('username')} 
                    className='form-control'
                    placeholder="Username"
                    onKeyPress={handleKeyPress}
                />
                {user.usernameError && <p style={{ color: 'red' }}>{user.usernameError}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={user.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange('password')} type="password" className="form-control" value={user.password} />
                </div>
                <button 
                    className="btn btn-primary btn-block m-1" 
                    onClick={nextStep}
                    disabled={user.username.trim() === '' || user.usernameAvailable === false}
                >
                    Next
                </button>
                <button 
                    className="btn btn-secondary btn-block m-1" 
                    onClick={prevStep}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default CombinedEmailSignUp;
