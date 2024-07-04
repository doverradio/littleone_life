import React from 'react';

const Step5Summary = ({ userData, handleSubmit, prevStep }) => {
    return (
        <div>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Phone: {userData.phone}</p>
            <div className="row">
                <div className="col">
                    <button 
                        className="btn btn-secondary btn-block m-1" 
                        onClick={prevStep}
                    >
                        Back
                    </button>
                </div>
                <div className="col">
                    <button 
                        className="btn btn-primary btn-block m-1" 
                        onClick={handleSubmit}
                        disabled={userData.username.trim() === '' || userData.usernameAvailable === false}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step5Summary;
