// ToggleSlider.js
import React from 'react';
import './styles.css'

const ToggleSlider = ({ isEnabled, toggleFunction, componentName, isDisabled }) => {
    return (
        <div className="toggle-slider-container">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isEnabled} 
              onChange={toggleFunction} 
              disabled={isDisabled} // Disable the input based on the prop
            />
            <span className="slider round"></span>
          </label>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="toggle-label">Email Notification Per Submitted {componentName}</span>
        </div>
      );
    // return (
    //   <div className="toggle-slider-container">
    //     <label className="switch">
    //       <input type="checkbox" checked={isEnabled} onChange={toggleFunction} />
    //       <span className="slider round"></span>
    //     </label>&nbsp;&nbsp;&nbsp;&nbsp;
    //     <span className="toggle-label">Email Notification Per Submitted {componentName}</span>
    //   </div>
    // );
  };
  
  export default ToggleSlider;
