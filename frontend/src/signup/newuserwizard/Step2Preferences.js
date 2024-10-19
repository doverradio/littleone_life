import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Step2Preferences = ({ userData, setUserData }) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="form-wizard-content m-3">
      <h5>Please choose which items below to track:</h5>
      
      {/* Sacraments Section */}
      <h6>Sacraments</h6>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="baptism"
            checked={userData.preferences?.baptism || false}
            onChange={handleCheckboxChange}
          />
          Baptism
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="confession"
            checked={userData.preferences?.confession || false}
            onChange={handleCheckboxChange}
          />
          Confession
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="holyMass"
            checked={userData.preferences?.holyMass || false}
            onChange={handleCheckboxChange}
          />
          Holy Mass
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="confirmation"
            checked={userData.preferences?.confirmation || false}
            onChange={handleCheckboxChange}
          />
          Confirmation
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="matrimony"
            checked={userData.preferences?.matrimony || false}
            onChange={handleCheckboxChange}
          />
          Matrimony
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="holyOrders"
            checked={userData.preferences?.holyOrders || false}
            onChange={handleCheckboxChange}
          />
          Holy Orders
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="anointingOfTheSick"
            checked={userData.preferences?.anointingOfTheSick || false}
            onChange={handleCheckboxChange}
          />
          Anointing of the Sick
        </Label>
      </FormGroup>
      
      {/* HyperDulia Section */}
      <h6 className='mt-2'>HyperDulia</h6>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="rosary"
            checked={userData.preferences?.rosary || false}
            onChange={handleCheckboxChange}
          />
          Rosary
        </Label>
      </FormGroup>
      
      {/* Fasting Section */}
      <h6 className='mt-2'>Fasting</h6>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="fasting"
            checked={userData.preferences?.fasting || false}
            onChange={handleCheckboxChange}
          />
          Fasting
        </Label>
      </FormGroup>

      {/* Divine Mercy Section */}
      <h6 className='mt-2'>Divine Mercy</h6>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="chapletOfDivineMercy"
            checked={userData.preferences?.chapletOfDivineMercy || false}
            onChange={handleCheckboxChange}
          />
          Chaplet of Divine Mercy
        </Label>
      </FormGroup>

      {/* Novenas Section */}
      <h6 className='mt-2'>Novenas</h6>
      <FormGroup check>
        <Label check>
            <Input
            type="checkbox"
            name="stJudeNovena"
            checked={userData.preferences?.stJudeNovena || false}
            onChange={handleCheckboxChange}
            />
            St. Jude Novena
        </Label>
        </FormGroup>
        <FormGroup check>
        <Label check>
            <Input
            type="checkbox"
            name="stThereseNovena"
            checked={userData.preferences?.stThereseNovena || false}
            onChange={handleCheckboxChange}
            />
            St. Therese of Lisieux Novena
        </Label>
        </FormGroup>

      {/* Dulia Section */}
      <h6 className='mt-2'>Dulia - Individual Prayers</h6>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="stMichael"
            checked={userData.preferences?.stMichael || false}
            onChange={handleCheckboxChange}
          />
          St. Michael Prayer
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="guardianAngel"
            checked={userData.preferences?.guardianAngel || false}
            onChange={handleCheckboxChange}
          />
          Guardian Angel Prayer
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="stFrancis"
            checked={userData.preferences?.stFrancis || false}
            onChange={handleCheckboxChange}
          />
          St. Francis Prayer
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="stLeandroRuiz"
            checked={userData.preferences?.stLeandroRuiz || false}
            onChange={handleCheckboxChange}
          />
          St. Leandro Ruiz Prayer
        </Label>
      </FormGroup>

      {/* Works Section */}
      <h6 className='mt-2'>Works</h6>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="evangelizingOthers"
            checked={userData.preferences?.evangelizingOthers || false}
            onChange={handleCheckboxChange}
          />
          Evangelizing Others
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="personalMinistry"
            checked={userData.preferences?.personalMinistry || false}
            onChange={handleCheckboxChange}
          />
          Personal Ministry
        </Label>
      </FormGroup>
    </div>
  );
};

export default Step2Preferences;
