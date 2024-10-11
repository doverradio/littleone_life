import React from 'react';
import { Button, UncontrolledPopover, PopoverBody, Progress } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './MassCard.css'; // Import your custom CSS

const MassCard = ({ masses, massLevel, massLevelBadge, calculateProgress }) => {
  const navigate = useNavigate();
  const massGoal = 4; // Monthly goal

  return (
    <div
      className="card mb-3 widget-content ornate-card"
      onClick={() => navigate('/prayers/mass')}
      style={{ cursor: 'pointer' }}
    >
      <div className="widget-content-outer ornate-background">
        <div className="widget-content-wrapper ornate-content">
          <div className="widget-content-left ornate-text">
            <div className="widget-heading">Masses Attended</div>
            <div className="widget-subheading">Goal: {massGoal} Masses</div>
          </div>
          <div className="widget-content-right ornate-numbers">
            <div className="widget-numbers text-warning">{masses}</div>
          </div>
        </div>
        <div className="widget-progress-wrapper">
          <Progress
            className="progress-bar-sm ornate-progress"
            color="danger"
            value={calculateProgress(masses, massGoal)}
          />
          <div className="progress-sub-label ornate-sub-label">
            <div className="sub-label-left">Mass Progress</div>
          </div>
          <div className="mt-1 ornate-level">
            Level: {massLevelBadge}
          </div>
        </div>
        <Button id="PopoverMassProgress" color="link" className="ornate-button" onClick={(e) => e.stopPropagation()}>
          More Info
        </Button>
        <UncontrolledPopover placement="bottom" target="PopoverMassProgress">
          <PopoverBody className="ornate-popover">
            {massLevel === 'Son of God' ? (
              'You are at the highest level, attending daily mass. Keep up the great work!'
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
