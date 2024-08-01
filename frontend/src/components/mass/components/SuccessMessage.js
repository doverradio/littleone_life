// src/components/mass/components/SuccessMessage.js

import React from 'react';

const SuccessMessage = ({ onReturn }) => (
    <div className="success-message">
        <h3>Mass successfully submitted</h3>
        <button className="btn btn-link" onClick={onReturn}>
            Return to form
        </button>
    </div>
);

export default SuccessMessage;
