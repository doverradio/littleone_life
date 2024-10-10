import React, { useState } from 'react';

const MultiStep = ({ steps, showNavigation }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const next = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const previous = () => {
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
        }
    };

    const goToStep = (stepIndex) => {
        setCurrentStep(stepIndex);
    };

    return (
        <div>
            <div>{steps[currentStep].component}</div>
            {showNavigation && (
                <div className="mt-3">
                    {currentStep > 0 && (
                        <button className="btn btn-secondary mr-2" onClick={previous}>Previous</button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <button className="btn btn-primary" onClick={next}>Next</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiStep;
