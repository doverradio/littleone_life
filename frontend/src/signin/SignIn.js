import React, { useState } from "react";
import { GoogleSignInButton } from './GoogleSignInButton'; // Google Sign-In button
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick"; // Template's slider component
import bg1 from '../styles/utils/images/originals/blessedmother2.jpg';
import bg2 from '../styles/utils/images/originals/redeemer.jpg';
import bg3 from '../styles/utils/images/originals/monstrance.JPG';
import { Col, Row, Button, Card, CardBody, CardHeader, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';
import NavbarMain from "../NavbarMain"; // Navbar
import Footer from "../Footer"; // Footer
import { useNavigate } from "react-router-dom"; // Navigation hook
import { signin } from '../api/auth'; // Sign-in API call
import { useAuth } from '../api/authHook'; // Custom hook for auth
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SignIn = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });
    const { username, password, loading, error, redirectToReferrer } = values;
    const { user } = useAuth();
    const navigate = useNavigate();
    const [accordion, setAccordion] = useState([true, false]); // Manage accordion state

    // Handle form input changes
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    // Handle form submission for username/password
    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        const userCredentials = { username, password };

        try {
            const response = await signin(userCredentials);
            if (response.error) {
                setValues({ ...values, error: response.error, loading: false });
                toast.error(response.error);
            } else {
                setValues({ ...values, redirectToReferrer: true });
                toast.success('Signed in successfully');
            }
        } catch (err) {
            setValues({ ...values, error: 'Sign in failed', loading: false });
            toast.error('Sign in failed');
        }
    };

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    };

    // Slider settings for background images
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        initialSlide: 0,
        autoplay: true,
        adaptiveHeight: true
    };

    // Toggle accordion sections
    const toggleAccordion = (tab) => {
        const state = accordion.map((x, index) => tab === index ? !x : false);
        setAccordion(state);
    };

    return (
        <div className="h-100">
            <NavbarMain />
            <ToastContainer />
            <Row className="h-100 no-gutters">
                <Col lg="4" className="d-none d-lg-block">
                    <div className="slider-light">
                        <Slider {...settings}>
                            <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                <div className="slide-img-bg" style={{ backgroundImage: `url(${bg1})` }} />
                                <div className="slider-content">
                                    <h3>“Totus Tuus, Maria”</h3>
                                    <p>Give yourself completely to the Blessed Mother, and she will lead you to her Son. Find your peace in her Immaculate Heart.</p>
                                </div>
                            </div>
                            <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                <div className="slide-img-bg" style={{ backgroundImage: `url(${bg3})` }} />
                                <div className="slider-content">
                                    <h3>“The Eucharist is the Source of Life”</h3>
                                    <p>Daily Mass, daily strength. Immerse yourself in the power of the Eucharist, the Body, and Blood of Christ.</p>
                                </div>
                            </div>
                            <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                <div className="slide-img-bg" style={{ backgroundImage: `url(${bg2})` }} />
                                <div className="slider-content">
                                    <h3>“Be Not Afraid”</h3>
                                    <p>The Lord calls you to rise above your fears. Embrace His grace and walk boldly in the footsteps of the saints.</p>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </Col>

                <Col lg="8" md="12" sm="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                    <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                        <h4 className="mb-0">
                            <div>Welcome back,</div>
                            <span>Please sign in to your account.</span>
                        </h4>

                        {/* Accordion Section */}
                        <div id="accordion" className="accordion-wrapper mb-3">
                            {/* Google Account Accordion */}
                            <Card>
                                <CardHeader id="headingOne">
                                    <Button block color="link" className="text-left m-0 p-0"
                                            onClick={() => toggleAccordion(0)}
                                            aria-expanded={accordion[0]}
                                            aria-controls="collapseOne">
                                        <h5 className="m-0 p-0">Sign in with Google Account</h5>
                                    </Button>
                                </CardHeader>
                                <Collapse isOpen={accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                    <CardBody>
                                        <GoogleSignInButton />
                                    </CardBody>
                                </Collapse>
                            </Card>

                            {/* Username and Password Accordion */}
                            <Card>
                                <CardHeader id="headingTwo">
                                    <Button block color="link" className="text-left m-0 p-0"
                                            onClick={() => toggleAccordion(1)}
                                            aria-expanded={accordion[1]}
                                            aria-controls="collapseTwo">
                                        <h5 className="m-0 p-0">Sign in with Username and Password</h5>
                                    </Button>
                                </CardHeader>
                                <Collapse isOpen={accordion[1]} data-parent="#accordion" id="collapseTwo">
                                    <CardBody>
                                        {/* Form for username/password sign-in */}
                                        <Form onSubmit={clickSubmit}>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="username">Username</Label>
                                                        <Input
                                                            type="text"
                                                            name="username"
                                                            id="username"
                                                            placeholder="Username here..."
                                                            value={username}
                                                            onChange={handleChange('username')}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="password">Password</Label>
                                                        <Input
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            placeholder="Password here..."
                                                            value={password}
                                                            onChange={handleChange('password')}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup check>
                                                <Input type="checkbox" name="check" id="exampleCheck" />
                                                <Label for="exampleCheck" check>Keep me logged in</Label>
                                            </FormGroup>

                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto">
                                                    <a href="javascript:void(0);" className="btn-lg btn btn-link">Recover Password</a>
                                                    <Button color="primary" size="lg" type="submit">Login to Dashboard</Button>
                                                </div>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </div>
                    </Col>
                </Col>
            </Row>
            <Footer />
            {redirectUser()}
        </div>
    );
};

export default SignIn;
