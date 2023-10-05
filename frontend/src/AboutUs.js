import React from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";

const AboutUs = () =>
{
    return(
        <>
            <NavbarMain />
            <div className="container-fluid main-content">
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1">Our Story</h2>
                        <p className="m-1 p-1">Born out of passion for connecting shoppers to the right deals, BigDeal.Sale started as a vision. 
                            A vision to make shopping not just about buying, but about the experience, the thrill of finding 
                            the right deal, and the joy of discovering quality products at affordable prices.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1">Our Mission</h2>
                        <p className="m-1 p-1">At BigDeal.Sale, we're on a mission to redefine online shopping. 
                        With countless products flooding the market every day, finding the perfect deal can feel like looking for 
                        a needle in a haystack. We cut through the noise, handpick the best deals, and present them to you in 
                        a way that's both fun and engaging.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1">Our Team</h2>
                        <p className="m-1 p-1">Our dedicated team of curators, tech enthusiasts, and market analysts work round 
                        the clock to ensure you don't just get a deal, but a 'big deal'. From the videos we create to the products 
                        we showcase, every decision is made keeping you in mind.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1">Why Choose Us?</h2>
                        <p className="m-1 p-1">&bull;&nbsp;<strong>Curated Deals: </strong> Every product on our site goes through a rigorous selection process.</p>
                        <p className="m-1 p-1">&bull;&nbsp;<strong>Trustworthy: </strong> Our team verifies every deal, ensuring you get what you've been promised.</p>
                        <p className="m-1 p-1">&bull;&nbsp;<strong>Engaging Experience:: </strong> With our social media videos, we make shopping interactive and fun.</p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1">Join Us on the Journey</h2>
                        <p className="m-1 p-1">As we continue to grow and evolve, we invite you to be a part of our journey. 
                        Engage with us, give feedback, and let's make BigDeal.Sale the ultimate shopping destination!
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs