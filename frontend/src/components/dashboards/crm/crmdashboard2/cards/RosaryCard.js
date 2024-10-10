import React from 'react';
import { Button, UncontrolledPopover, PopoverBody, Progress } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const RosaryCard = ({ rosaries, rosaryLevelBadge, calculateProgress }) => {
  const navigate = useNavigate();
  const rosaryGoal = 5; // Weekly goal

  return (
    <div className="card mb-3 widget-content" onClick={() => navigate('/prayers/rosary')} style={{ cursor: 'pointer' }}>
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Rosaries Prayed</div>
            <div className="widget-subheading">Weekly Goal: {rosaryGoal} Rosaries</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-success">
              {rosaries} 
            </div>
          </div>
        </div>
        <div className="widget-progress-wrapper">
          <Progress className="progress-bar-sm" color="primary" value={calculateProgress(rosaries, rosaryGoal)} />
          <div className="progress-sub-label">
            <div className="sub-label-left">Rosary Progress</div>
            <div className="sub-label-right">{calculateProgress(rosaries, rosaryGoal).toFixed(1)}%</div>
          </div>
          <div className='mt-1'>
            Level: {rosaryLevelBadge}
          </div>
        </div>
        <Button id="PopoverRosaryProgress" color="link" onClick={(e) => e.stopPropagation()}>More Info</Button>
        <UncontrolledPopover placement="bottom" target="PopoverRosaryProgress">
          <PopoverBody>Pray 5 rosaries per week to maintain spiritual growth. Every rosary brings you closer to the Blessed Mother!</PopoverBody>
        </UncontrolledPopover>
      </div>
    </div>
  );
};

export default RosaryCard;
