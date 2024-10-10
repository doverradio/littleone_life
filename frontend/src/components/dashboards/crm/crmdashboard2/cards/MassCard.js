import React from 'react';
import { Button, UncontrolledPopover, PopoverBody, Progress } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const MassCard = ({ masses, massLevel, massLevelBadge, calculateProgress }) => {
  const navigate = useNavigate();
  const massGoal = 4; // Monthly goal

  return (
    <div className="card mb-3 widget-content" onClick={() => navigate('/prayers/mass')} style={{ cursor: 'pointer' }}>
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Masses Attended</div>
            <div className="widget-subheading">Weekly/Monthly Goal: {massGoal} Masses</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-warning">
              {masses} 
            </div>
          </div>
        </div>
        <div className="widget-progress-wrapper">
          <Progress className="progress-bar-sm" color="danger" value={calculateProgress(masses, massGoal)} />
          <div className="progress-sub-label">
            <div className="sub-label-left">Mass Progress</div>
          </div>
          <div className='mt-1'>
            Level: {massLevelBadge}
          </div>
        </div>
        <Button id="PopoverMassProgress" color="link" onClick={(e) => e.stopPropagation()}>More Info</Button>
        <UncontrolledPopover placement="bottom" target="PopoverMassProgress">
          <PopoverBody>
            {massLevel === "Son of God" ? (
              "You are at the highest level, attending daily mass. Keep up the great work!"
            ) : (
              "Attend more masses to reach the 'Son of God' level. Consistency is key!"
            )}
          </PopoverBody>
        </UncontrolledPopover>
      </div>
    </div>
  );
};

export default MassCard;
