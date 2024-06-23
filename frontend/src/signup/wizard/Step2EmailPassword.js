import React from 'react';

const Step2EmailPassword = ({ userData, setUserData, nextStep, prevStep, handleKeyPress, googleProfile }) => {
    const handleChange = (input) => (e) => {
        let value = e.target.value;
        setUserData({ ...userData, [input]: value });
    };

    return (
        <div>
            <input 
                type="email" 
                value={userData.email} 
                onChange={handleChange('email')} 
                placeholder="Email"
                className='form-control'
                onKeyPress={handleKeyPress}
            />
            {!googleProfile && (
                <>
                    <input 
                        type="password" 
                        value={userData.password} 
                        onChange={handleChange('password')} 
                        placeholder="Password"
                        className='form-control mb-3'
                    />
                    <input 
                        type="password" 
                        value={userData.confirmPassword} 
                        onChange={handleChange('confirmPassword')} 
                        placeholder="Confirm Password"
                        className='form-control mb-3'
                    />
                </>
            )}
            <div className="row">
                <div className="col">
                    <button className="btn btn-secondary btn-sm w-100 m-1" onClick={prevStep}>Back</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary btn-sm w-100 m-1" onClick={nextStep}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Step2EmailPassword;
