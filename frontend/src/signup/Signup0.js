import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import bg3 from '../styles/utils/images/originals/baptism.jpg'; 
import rosaryImage from '../styles/utils/images/originals/rosary.jpg'; 
import stThereseImage from '../styles/utils/images/originals/st_therese.jpg'; 
import { Col, Row, Button, Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import { signup, checkUsernameAvailability } from '../api/auth';
import GoogleSignupButton from './GoogleSignupButton';
import MultiStep from './MultiStep';
import Step1Username from './wizard/Step1Username';
import Step2EmailPassword from './wizard/Step2EmailPassword';
import Step3Names from './wizard/Step3Names';
import Step4Phone from './wizard/Step4Phone';
import Step5Summary from './wizard/Step5Summary';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.css';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA

const SignUp0 = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const [accordion, setAccordion] = useState([true, false]); 
    const [captchaValue, setCaptchaValue] = useState(null); // Store reCAPTCHA value
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 

    const SITE_KEY = process.env.REACT_APP_RECAPTCHA_KEY; // Replace this with your actual reCAPTCHA site key

    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        initialSlide: 0,
        autoplay: true,
        adaptiveHeight: true
    };

    const toggleAccordion = (tab) => {
        const state = accordion.map((x, index) => tab === index ? !x : false);
        setAccordion(state);
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); // Store reCAPTCHA value when completed
    };

    const handleSubmit = async () => {
        if (!captchaValue) {
            toast.error('Please complete the CAPTCHA to proceed.');
            return;
        }
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

    const checkUsername = async () => {
        if (userData.username.trim()) {
            setLoading(true); 
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
                setLoading(false); 
            }
        } else {
            setUserData({
                ...userData,
                usernameAvailable: null,
                canProceed: false
            });
        }
    };

    const steps = [
        { 
            name: 'Account Information', 
            component: <Step1Username 
                userData={userData} 
                setUserData={setUserData} 
                checkUsername={checkUsername}  
                loading={loading} 
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
                handleSubmit={handleSubmit}  
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

                        <div id="accordion" className="accordion-wrapper mb-3">
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
                                        <MultiStep steps={steps} showNavigation={true} />
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </div>

                        {/* Add reCAPTCHA below the form */}
                        <ReCAPTCHA
                            sitekey={SITE_KEY}
                            onChange={handleCaptchaChange}
                        />
                    </Col>
                </Col>

                <Col lg="5" sm="12" xs="12" className="d-none d-lg-block">
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
                            <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                <div className="slide-img-bg" style={{ backgroundImage: `url(${rosaryImage})` }} />
                                <div className="slider-content">
                                    <h3>“The Power of Prayer”</h3>
                                    <p>
                                        Prayer is the foundation of your relationship with God. It opens the door to His grace 
                                        and strengthens your soul. Never underestimate the power of a single prayer.
                                    </p>
                                </div>
                            </div>
                            <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                <div className="slide-img-bg" style={{ backgroundImage: `url(${stThereseImage})` }} />
                                <div className="slider-content">
                                    <h3>“Called to Be Saints”</h3>
                                    <p>
                                        Every baptized soul is called to holiness. Follow the path of the saints before you, and 
                                        let their example inspire you to live a life of virtue and faith.
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

export default SignUp0;
