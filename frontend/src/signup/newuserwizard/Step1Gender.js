import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Step1Gender = ({ userData, setUserData }) => {
  const handleGenderChange = (e) => {
    setUserData({ ...userData, gender: e.target.value });
  };

  return (
    <div className="form-wizard-content m-3">
      <h5>Are you male or female?</h5>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="gender" 
            value="Male" 
            onChange={handleGenderChange} 
            checked={userData.gender === 'Male'}
          /> 
          Male
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input 
            type="radio" 
            name="gender" 
            value="Female" 
            onChange={handleGenderChange} 
            checked={userData.gender === 'Female'}
          /> 
          Female
        </Label>
      </FormGroup>
    </div>
  );
};

export default Step1Gender;
