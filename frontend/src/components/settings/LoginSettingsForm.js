import React from 'react';

const LoginSettingsForm = ({ settings, handleChange }) => (
    <>
        <div className="form-group">
            <label>Change Username:</label>
            <input 
                type="text" 
                name="username" 
                value={settings.username} 
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Change Password:</label>
            <input 
                type="password" 
                name="password" 
                value={settings.password} 
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Preferred Login Type:</label>
            <select 
                name="preferredLoginType" 
                value={settings.preferredLoginType} 
                onChange={handleChange}
                className="form-control"
            >
                <option value="username-password">Username/Password</option>
                <option value="google">Google Account</option>
            </select>
        </div>
    </>
);

export default LoginSettingsForm;
