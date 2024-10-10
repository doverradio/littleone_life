import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import bg3 from '../styles/utils/images/originals/baptism.jpg'; // Import background
import { Col, Row, Button, Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import NavbarMain from "../NavbarMain"; // Navbar
import Footer from "../Footer"; // Footer
import { signup, checkUsernameAvailability } from '../api/auth'; // Include checkUsernameAvailability function
import GoogleSignupButton from './GoogleSignupButton'; // Google Signup button component
import MultiStep from './MultiStep'; // Multi-step component for the signup process
import Step1Username from './wizard/Step1Username';
import Step2EmailPassword from './wizard/Step2EmailPassword'; // Import the email/password step
import Step3Names from './wizard/Step3Names';
import Step4Phone from './wizard/Step4Phone';
import Step5Summary from './wizard/Step5Summary';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.css';


const SignUp = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const [accordion, setAccordion] = useState([true, false]); // State for managing accordion
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Add a loading state for the username check

    // Slider settings for the background
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

    // Handle form submission (called by Step5Summary)
    const handleSubmit = async () => {
        try {
            const response = await signup(userData);
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success('Signup successful!');
                navigate('/signin');
            }
        } catch (error) {
            toast.error('Signup failed. Please try again.');
        }
    };

    // Function to check username availability with loading state
    const checkUsername = async () => {
        if (userData.username.trim()) {
            setLoading(true); // Start loading
            try {
                const result = await checkUsernameAvailability(userData.username);
                setUserData({
                    ...userData,
                    usernameAvailable: result.isAvailable,
                    canProceed: result.isAvailable
                });
            } catch (error) {
                console.error('Error checking username:', error);
                setUserData({
                    ...userData,
                    usernameAvailable: false,
                    canProceed: false
                });
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            setUserData({
                ...userData,
                usernameAvailable: null,
                canProceed: false
            });
        }
    };

    // Wizard steps with props passed in
    const steps = [
        { 
            name: 'Account Information', 
            component: <Step1Username 
                userData={userData} 
                setUserData={setUserData} 
                checkUsername={checkUsername}  // Pass checkUsername here
                loading={loading} // Pass loading state
            /> 
        },
        { 
            name: 'Email and Password', 
            component: <Step2EmailPassword 
                userData={userData} 
                setUserData={setUserData}
            />
        },
        { 
            name: 'Personal Information', 
            component: <Step3Names 
                userData={userData} 
                setUserData={setUserData} 
            /> 
        },
        { 
            name: 'Phone Number', 
            component: <Step4Phone 
                userData={userData} 
                setUserData={setUserData} 
            /> 
        },
        { 
            name: 'Review and Submit', 
            component: <Step5Summary 
                userData={userData} 
                handleSubmit={handleSubmit}  // Pass handleSubmit here
            /> 
        }
    ];

    return (
        <div className="h-100">
            <NavbarMain />
            <ToastContainer />
            <Row className="h-100 no-gutters">
                <Col lg="7" md="12" sm="12" xs="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                    <Col lg="9" md="10" sm="12" xs="12" className="mx-auto app-login-box">
                        <div className="app-logo" />
                        <h4>
                            <div>Welcome,</div>
                            <span>It only takes a <span className="text-success">few seconds</span> to create your account</span>
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
                                        <h5 className="m-0 p-0">Sign up with Google Account</h5>
                                    </Button>
                                </CardHeader>
                                <Collapse isOpen={accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                    <CardBody>
                                        <GoogleSignupButton />
                                    </CardBody>
                                </Collapse>
                            </Card>

                            {/* Username and Password Accordion with Form Wizard */}
                            <Card>
                                <CardHeader id="headingTwo">
                                    <Button block color="link" className="text-left m-0 p-0"
                                            onClick={() => toggleAccordion(1)}
                                            aria-expanded={accordion[1]}
                                            aria-controls="collapseTwo">
                                        <h5 className="m-0 p-0">Sign up with Username and Password</h5>
                                    </Button>
                                </CardHeader>
                                <Collapse isOpen={accordion[1]} data-parent="#accordion" id="collapseTwo">
                                    <CardBody>
                                        {/* Multi-Step Wizard Integration */}
                                        <MultiStep steps={steps} showNavigation={true} />
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </div>
                    </Col>
                </Col>

                {/* Background Slider Section */}
                <Col lg="5" sm="12" xs="12" className="d-lg-flex d-none">
                    <div className="slider-light">
                        <Slider {...settings}>
                            <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                <div className="slide-img-bg" style={{ backgroundImage: `url(${bg3})` }} />
                                <div className="slider-content">
                                    <h3>“Begin Your Journey with Christ”</h3>
                                    <p>
                                        Your faith is a living, growing journey. Take the first step today, and let this community guide you closer to the Sacred Heart of Jesus. Together, we grow stronger in prayer, faith, and love.
                                    </p>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    );
};

export default SignUp;
