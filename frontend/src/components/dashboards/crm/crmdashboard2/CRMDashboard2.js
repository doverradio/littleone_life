import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RosaryCard from './cards/RosaryCard';
import MassCard from './cards/MassCard';
import DivineMercyCard from './cards/DivineMercyCard';

export default class CRMDashboard2 extends Component {
  state = {
    tooltipOpen: {
      massBadge: false,
      rosaryProgress: false,
      chapletProgress: false
    }
  };

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
    return percentage > 100 ? 100 : percentage;
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

  getRosaryLevel(rosaries) {
    if (rosaries >= 30) {
      return { rosaryLevel: "Apostle of the Rosary", badge: "🔵 Apostle of the Rosary" };
    } else if (rosaries >= 20) {
      return { rosaryLevel: "Champion of the Rosary", badge: "🏅 Champion of the Rosary" };
    } else if (rosaries >= 15) {
      return { rosaryLevel: "Disciple of Mary", badge: "🌟 Disciple of Mary" };
    } else if (rosaries >= 7) {
      return { rosaryLevel: "Child of Mary", badge: "💙 Child of Mary" };
    } else if (rosaries >= 3) {
      return { rosaryLevel: "Devoted Servant", badge: "🙏 Devoted Servant" };
    } else {
      return { rosaryLevel: "Handmaid of Mary", badge: "🌸 Handmaid of Mary" };
    }
  }

  render() {
    const { userStats } = this.props;

    const { massLevel, badge: massLevelBadge } = this.getMassLevel(userStats.masses || 0);
    const { rosaryLevel, badge: rosaryLevelBadge } = this.getRosaryLevel(userStats.rosaries || 0);

    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="6" xl="4">
              <RosaryCard
                rosaries={userStats.rosaries}
                rosaryLevelBadge={rosaryLevelBadge}
                calculateProgress={this.calculateProgress}
              />
            </Col>

            <Col md="6" xl="4">
              <MassCard
                masses={userStats.masses}
                massLevel={massLevel}
                massLevelBadge={massLevelBadge}
                calculateProgress={this.calculateProgress}
              />
            </Col>

            <Col md="6" xl="4">
              <DivineMercyCard
                divineMercies={userStats.divineMercies}
                calculateProgress={this.calculateProgress}
              />
            </Col>

          </Row>
        </Container>
      </Fragment>
    );
  }
}
