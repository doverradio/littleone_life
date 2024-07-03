import React from 'react';
import { Link } from 'react-router-dom';
import NavbarMain from './NavbarMain';
import Footer from './Footer';

const AboutPage = () => {
    return (
        <>
            <NavbarMain />
            <div className="container" style={{ minHeight: '80vh' }}>
                <h2>About Littleone.life</h2>
                <p>
                    Welcome to Littleone.life, a place where your prayers are counted and your blessings multiply.
                    Our platform offers a system for you to tally your prayers, helping you stay focused on your spiritual journey.
                </p>
                <p>
                    Use an email and password or Google account to create a new account with Littleone.life. After testing this idea on Google Forms for over 10 years,
                    we have found that having a place to tally your prayers is very effective in keeping you focused on God. And so, since we can code, 
                    we created this website to do the same thing but better!
                </p>
                <p>
                    Once you have an account, you can choose between multiple modules dedicated to tracking your prayers. Those include Mass, Confessions, Rosary,
                    Chaplet of Divine Mercy, and others.
                </p>
                <p>
                    Later, we plan to add great features to the site, such as Dating for Catholics, Instant prayer army (you push a button and for 10 minutes,
                    people can gather to pray a rosary with you), Marketplace, and E-Learning.
                </p>
                <p>
                    Join us today and start your spiritual journey with Littleone.life.
                </p>
                <div className="d-flex justify-content-center mt-4">
                <Link to="/" className="btn btn-secondary mx-2">Back to Home</Link>
                    <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AboutPage;
