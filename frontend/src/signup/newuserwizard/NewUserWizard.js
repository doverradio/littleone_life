import React, { Fragment, useState } from 'react';
import MultiStep from '../MultiStep';
import Step1Gender from './Step1Gender';
import Step2Preferences from './Step2Preferences';
import Step3Finish from './Step3Finish'; // Update: combining summary and finish step
import { useNavigate } from 'react-router-dom';

const NewUserWizard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Submit user data, then navigate to dashboard
    console.log('Final user data:', userData);
    navigate('/user/dashboard'); // Or any other final route
  };

  // Updated steps: removed Step4Finish and merged it with Step3Finish
  const steps = [
    { name: 'Step 1: Gender', component: <Step1Gender userData={userData} setUserData={setUserData} /> },
    { name: 'Step 2: Preferences', component: <Step2Preferences userData={userData} setUserData={setUserData} /> },
    { name: 'Step 3: Finish', component: <Step3Finish userData={userData} handleSubmit={handleSubmit} /> },
  ];

  return (
    <Fragment>
      <MultiStep steps={steps} showNavigation={true} />
    </Fragment>
  );
};

export default NewUserWizard;
