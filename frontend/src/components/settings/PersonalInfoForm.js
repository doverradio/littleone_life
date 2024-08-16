import React from 'react';

const PersonalInfoForm = ({ settings, handleChange }) => (
    <>
        <div className="form-group">
            <label>First Name:</label>
            <input 
                type="text" 
                name="firstName" 
                value={settings.firstName} 
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Last Name:</label>
            <input 
                type="text" 
                name="lastName" 
                value={settings.lastName} 
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Phone Number:</label>
            <input 
                type="text" 
                name="phoneNumber" 
                value={settings.phoneNumber} 
                onChange={handleChange}
                className="form-control"
            />
        </div>
    </>
);

export default PersonalInfoForm;
