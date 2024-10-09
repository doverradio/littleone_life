import React, {Component, Fragment} from 'react';
import { faker } from '@faker-js/faker';
import classnames from 'classnames';
import ReactTable from "react-table";

import {
    Row, Col,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Nav,
    Container,
    NavItem,
    ListGroup,
    ListGroupItem,
    Card, CardBody,
    CardHeader,
    NavLink,
    TabContent,
    TabPane,
    Progress,
    CardFooter,
    ButtonGroup,
} from 'reactstrap';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    Tooltip
} from 'recharts';

import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    faAngleUp,
    faDotCircle,
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';

import {
    Sparklines,
    SparklinesCurve
} from 'react-sparklines';

// import {makeData} from "../../../Tables/DataTables/Examples/utils";


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';

// import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
// import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
// import avatar3 from '../../../../assets/utils/images/avatars/3.jpg';

const data55 = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page C', uv: 2000, pv: 6800, amt: 2290},
    {name: 'Page D', uv: 4780, pv: 7908, amt: 2000},
    {name: 'Page E', uv: 2890, pv: 9800, amt: 2181},
    {name: 'Page F', uv: 1390, pv: 3800, amt: 1500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data22 = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page C', uv: 2000, pv: 6800, amt: 2290},
    {name: 'Page D', uv: 4780, pv: 7908, amt: 2000},
    {name: 'Page E', uv: 2890, pv: 9800, amt: 2181},
    {name: 'Page F', uv: 1390, pv: 3800, amt: 1500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data3 = [
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page D', uv: 4780, pv: 7908, amt: 2000},
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page F', uv: 1390, pv: 3800, amt: 1500},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page E', uv: 2890, pv: 9800, amt: 2181},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page C', uv: 2000, pv: 6800, amt: 2290},
];

const data2 = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page D', uv: 4780, pv: 7908, amt: 2000},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page C', uv: 2000, pv: 6800, amt: 2290},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page E', uv: 2890, pv: 9800, amt: 2181},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page F', uv: 1390, pv: 3800, amt: 1500},
];


const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33 ? "complicated" : "single"
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}

function boxMullerRandom() {
    let phase = false,
        x1, x2, w, z;

    return (function () {

        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);
const sampleData2 = randomData(15);
const sampleData3 = randomData(8);
const sampleData4 = randomData(12);

export default class CRMDashboard2 extends Component {
    constructor(props) {
        super(props);

        this.toggle2 = this.toggle2.bind(this);
        this.state = {
            activeTab2: '222',
            activeTab1: '11',
            data: makeData()
        };
    }

    toggle2(tab) {
        if (this.state.activeTab2 !== tab) {
            this.setState({
                activeTab2: tab
            });
        }
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    render() {
        const {data} = this.state;
        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <Col md="6" xl="4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                Total Orders
                                            </div>
                                            <div className="widget-subheading">
                                                Last year expenses
                                            </div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-success">
                                                1896
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget-progress-wrapper">
                                        <Progress className="progress-bar-sm" color="primary" value="71"/>
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">
                                                YoY Growth
                                            </div>
                                            <div className="sub-label-right">
                                                100%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="6" xl="4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                Products Sold
                                            </div>
                                            <div className="widget-subheading">
                                                Revenue streams
                                            </div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-warning">
                                                $3M
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget-progress-wrapper">
                                        <Progress className="progress-bar-sm progress-bar-animated-alt"
                                                  color="danger"
                                                  value="85"/>
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">
                                                Sales
                                            </div>
                                            <div className="sub-label-right">
                                                100%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="6" xl="4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                Followers
                                            </div>
                                            <div className="widget-subheading">
                                                People Interested
                                            </div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-danger">
                                                45,9%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget-progress-wrapper">
                                        <Progress className="progress-bar-sm progress-bar-animated-alt"
                                                  color="success"
                                                  value="46"/>
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">
                                                Twitter Progress
                                            </div>
                                            <div className="sub-label-right">
                                                100%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
