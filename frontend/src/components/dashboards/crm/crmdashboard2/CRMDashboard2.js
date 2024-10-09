import React, { Component, Fragment } from 'react';
import { Button, UncontrolledPopover, PopoverBody, Progress, Container, Row, Col } from 'reactstrap';

export default class CRMDashboard2 extends Component {
  state = {
    tooltipOpen: {
      massBadge: false, // Tooltip for Mass Badge
      rosaryProgress: false, // Tooltip for Rosary Progress
      chapletProgress: false // Tooltip for Divine Mercy Chaplet Progress
    }
  };

  // Helper function to toggle tooltips
  toggleTooltip = (tooltipName) => {
    this.setState({
      tooltipOpen: {
        ...this.state.tooltipOpen,
        [tooltipName]: !this.state.tooltipOpen[tooltipName]
      }
    });
  };

  calculateProgress(current, goal) {
    const percentage = (current / goal) * 100;
    return percentage > 100 ? 100 : percentage; // Ensure the bar doesn't exceed 100%
  }

  getMassLevel(masses) {
    if (masses >= 30) {
      return { massLevel: "Son of God", badge: "🌟 Son of God" };
    } else if (masses >= 4) {
      return { massLevel: "Priest", badge: "🧑‍💼 Priest" };
    } else {
      return { massLevel: "King", badge: "👑 King" };
    }
  }

  render() {
    const { userStats } = this.props;

    // Define goals
    const rosaryGoal = 5; // Weekly goal
    const massGoal = 4; // Monthly goal
    const divineMercyGoal = 10; // Weekly goal
    const { massLevel, badge: massLevelBadge } = this.getMassLevel(userStats.masses || 0);

    return (
      <Fragment>
        <Container fluid>
          <Row>
            {/* Rosary Progress Card */}
            <Col md="6" xl="4">
              <div className="card mb-3 widget-content">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                      <div className="widget-heading">Rosaries Prayed</div>
                      <div className="widget-subheading">Weekly Goal: 5 Rosaries</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-success">
                        {userStats.rosaries}
                      </div>
                    </div>
                  </div>
                  <div className="widget-progress-wrapper">
                    <Progress className="progress-bar-sm" color="primary" value={this.calculateProgress(userStats.rosaries, rosaryGoal)} />
                    <div className="progress-sub-label">
                      <div className="sub-label-left">Rosary Progress</div>
                      <div className="sub-label-right">
                        {this.calculateProgress(userStats.rosaries, rosaryGoal).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <Button id="PopoverRosaryProgress" color="link">More Info</Button>
                  <UncontrolledPopover placement="bottom" target="PopoverRosaryProgress">
                    <PopoverBody>Complete 5 Rosaries per week to stay on track. Each rosary is a step closer to spiritual growth!</PopoverBody>
                  </UncontrolledPopover>
                </div>
              </div>
            </Col>

            {/* Mass Attendance Progress Card */}
            <Col md="6" xl="4">
              <div className="card mb-3 widget-content">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                      <div className="widget-heading">Masses Attended</div>
                      <div className="widget-subheading">Weekly/Monthly Goal: {massGoal} Masses</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-warning">
                        {userStats.masses} ({massLevel})
                      </div>
                    </div>
                  </div>
                  <div className="widget-progress-wrapper">
                    <Progress className="progress-bar-sm" color="danger" value={this.calculateProgress(userStats.masses, massGoal)} />
                    <div className="progress-sub-label">
                      <div className="sub-label-left">Mass Progress</div>
                      <div className="sub-label-right">{massLevelBadge}</div>
                    </div>
                  </div>
                  <Button id="PopoverMassProgress" color="link">More Info</Button>
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
            </Col>

            {/* Divine Mercy Progress Card */}
            <Col md="6" xl="4">
              <div className="card mb-3 widget-content">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                      <div className="widget-heading">Divine Mercy Chaplets</div>
                      <div className="widget-subheading">Weekly Goal: 10 Chaplets</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-danger">
                        {userStats.divineMercies}
                      </div>
                    </div>
                  </div>
                  <div className="widget-progress-wrapper">
                    <Progress className="progress-bar-sm" color="success" value={this.calculateProgress(userStats.divineMercies, divineMercyGoal)} />
                    <div className="progress-sub-label">
                      <div className="sub-label-left">Chaplet Progress</div>
                      <div className="sub-label-right">
                        {this.calculateProgress(userStats.divineMercies, divineMercyGoal).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <Button id="PopoverChapletProgress" color="link">More Info</Button>
                  <UncontrolledPopover placement="bottom" target="PopoverChapletProgress">
                    <PopoverBody>Pray more chaplets to strengthen your faith and commitment.</PopoverBody>
                  </UncontrolledPopover>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
