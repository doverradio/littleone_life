import React from 'react';
import { Button } from 'reactstrap';

const Step3Finish = ({ userData, handleSubmit }) => {
  return (
    <div className='m-3'>
      
      <div className="form-wizard-content">
          <div className="no-results">
              <div className="sa-icon sa-success animate">
                  <span className="sa-line sa-tip animateSuccessTip"/>
                  <span className="sa-line sa-long animateSuccessLong"/>

                  <div className="sa-placeholder"/>
                  <div className="sa-fix"/>
              </div>
              <div className="results-title">Click Finished below to go to the User Dashboard!</div>
              <div className="results-subtitle mt-4">Finished!</div>

              <div className="mt-3 mb-3"/>
              <div className="text-center">
                  <Button color="success" size="lg" className="btn-shadow btn-wide" onClick={handleSubmit}>
                      Finish
                  </Button>
              </div>

              {/* <div className="results-title">Preferences</div> */}

          </div>
      </div>
    </div>
  );
};

export default Step3Finish;
