// ProgressBar.js
import React from 'react';

const ProgressBar = ({ step, totalSteps }) => {
    return (
        <div className="progress mb-3">
            <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ width: `${(step - 1) * (100 / totalSteps)}%` }} 
                aria-valuenow={(step - 1) * (100 / totalSteps)} 
                aria-valuemin="0" 
                aria-valuemax="100">
                Step {step} of {totalSteps}
            </div>
        </div>
    );
};

export default ProgressBar;
