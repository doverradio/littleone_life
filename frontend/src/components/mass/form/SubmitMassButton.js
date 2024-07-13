import React from 'react';
import ButtonLoader from '../../../loaders/ButtonLoader';

const SubmitMassButton = ({ handleSubmitMass, isSubmitting }) => (
    <div className="row">
        <div className="col-12">
            <button 
                className='btn btn-primary btn-block m-1' 
                type="submit"
                onClick={e => {
                    e.preventDefault();
                    handleSubmitMass();
                }}
            >
                {isSubmitting ? <ButtonLoader /> : 'Submit Mass'}
            </button>
        </div>
    </div>
);

export default SubmitMassButton;
