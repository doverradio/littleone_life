import React from 'react';
import { Button, UncontrolledPopover, PopoverBody, Progress } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const DivineMercyCard = ({ divineMercies, calculateProgress }) => {
  const navigate = useNavigate();
  const divineMercyGoal = 10; // Weekly goal

  const getDivineMercyLevel = (chaplets) => {
    if (chaplets >= 30) {
      return { level: "Apostle of Mercy", badge: "🕊️ Apostle of Mercy" };
    } else if (chaplets >= 20) {
      return { level: "Messenger of Mercy", badge: "📜 Messenger of Mercy" };
    } else if (chaplets >= 15) {
      return { level: "Servant of Mercy", badge: "🙏 Servant of Mercy" };
    } else if (chaplets >= 7) {
      return { level: "Disciple of Mercy", badge: "🌟 Disciple of Mercy" };
    } else if (chaplets >= 3) {
      return { level: "Child of Mercy", badge: "💙 Child of Mercy" };
    } else {
      return { level: "Seeker of Mercy", badge: "🌸 Seeker of Mercy" };
    }
  };

  const { level, badge } = getDivineMercyLevel(divineMercies || 0);

  return (
    <div className="card mb-3 widget-content" onClick={() => navigate('/prayers/divinemercy')} style={{ cursor: 'pointer' }}>
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Divine Mercy Chaplets</div>
            <div className="widget-subheading">Weekly Goal: {divineMercyGoal} Chaplets</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-danger">
              {divineMercies}
            </div>
          </div>
        </div>
        <div className="widget-progress-wrapper">
          <Progress className="progress-bar-sm" color="success" value={calculateProgress(divineMercies, divineMercyGoal)} />
          <div className="progress-sub-label">
            <div className="sub-label-left">Chaplet Progress</div>
          </div>
          <div className="mt-1">
            Level: {badge}
          </div>
        </div>
        <Button id="PopoverChapletProgress" color="link" onClick={(e) => e.stopPropagation()}>More Info</Button>
        <UncontrolledPopover placement="bottom" target="PopoverChapletProgress">
          <PopoverBody>
            {level === "Apostle of Mercy" ? (
              "You are a true Apostle of Divine Mercy! Keep praying and spreading mercy to the world."
            ) : (
              "Pray more chaplets to grow in the devotion to Divine Mercy. You're on the right path!"
            )}
          </PopoverBody>
        </UncontrolledPopover>
      </div>
    </div>
  );
};

export default DivineMercyCard;
