import React from 'react';

const Step4Phone = ({ userData, setUserData, nextStep, prevStep, handleKeyPress }) => {
    const handleChange = (input) => (e) => {
        let value = e.target.value;
        setUserData({ ...userData, [input]: value });
    };

    return (
        <div>
            <input 
                type="tel" 
                value={userData.phone} 
                onChange={handleChange('phone')} 
                placeholder="Enter Phone Number (XXX) XXX-XXXX"
                className='form-control'
                maxLength={14}
                onKeyPress={handleKeyPress}
            />
            <div className="row mt-3">
                <div className="col">
                    <button className="btn btn-secondary btn-sm w-100" onClick={prevStep}>Back</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-sm w-100" onClick={nextStep}>Next</button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <button className="btn btn-outline-secondary btn-sm w-100" onClick={nextStep}>Skip</button>
                </div>
            </div>
        </div>
    );
};

export default Step4Phone;
