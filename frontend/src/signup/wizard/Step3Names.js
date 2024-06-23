import React from 'react';

const Step3Names = ({ userData, setUserData, nextStep, prevStep, handleKeyPress }) => {
    const handleChange = (input) => (e) => {
        let value = e.target.value;
        setUserData({ ...userData, [input]: value });
    };

    return (
        <div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <input 
                        type="text" 
                        value={userData.firstName} 
                        onChange={handleChange('firstName')} 
                        placeholder="First Name"
                        className='form-control mb-2 mb-md-0'
                    />
                </div>
                <div className="col-12 col-md-6">
                    <input 
                        type="text" 
                        value={userData.lastName} 
                        onChange={handleChange('lastName')} 
                        placeholder="Last Name"
                        className='form-control'
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <button className="btn btn-secondary btn-sm w-100" onClick={prevStep}>Back</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-sm w-100" onClick={nextStep}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Step3Names;
