import React from "react";
import { Link } from 'react-router-dom';

const MainPageBody = () => {
    return (
        <>
            <div className="container-fluid main-page-content" style={{ backgroundColor: 'black' }}>
                <img src="FullLogo_Transparent_NoBuffer.png" alt="littleone.life Logo" className="img-fluid" />

                <div className="row mt-4">
                    <div className="col-12" style={{ color: "white" }}>
                        <h1 className="text-center d-lg-none">Enlist in the Divine Mission.</h1>
                        <h1 className="text-center d-sm-block">Embrace the Light. Embody the Love. Enlist in the Divine Mission.</h1>

                        <p className="text-center">Discover a Spiritual Journey Unlike Any Other</p>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 text-center" style={{ color: "white" }}>
                        <h2>Why Join Us?</h2>
                        <ul style={{ listStyle: "none" }}>
                            <li>&bull; Purposeful Living: Align yourself with the Divine Will.</li>
                            <li>&bull; Digital Prayer Diary: Track your spiritual milestones.</li>
                            <li>&bull; Unyielding Support: A community that prays together, stays together.</li>
                        </ul>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 text-center" style={{ color: "white" }}>
                        <h2>Daily Commitment, Lifetime of Blessings</h2>
                        <p>Commit to the <strong>submission prayer</strong> or the <strong>Holy Mass</strong> daily and step into a life of grace.</p>
                    </div>
                </div>

                {/* <div className="row mt-4">
                    <div className="col-12" style={{ color: "white" }}>
                        <h2 className="text-center">Testimonials</h2>
                        <p>"Joining littleone.life transformed my spiritual journey. I've found a community that understands." - Anna M.</p>
                        <p>"Every day feels purposeful. The daily commitment reminds me of the larger mission." - Michael P.</p>
                    </div>
                </div> */}

                <div className="row mt-4 mb-5">
                    <div className="col-12 text-center" style={{ color: "white" }}>
                        <h2>Become a Soldier of the Light</h2>
                        <p>Feel the call? Join us.</p>
                        <Link to="/signup" className="btn btn-light btn-sm">Join Now</Link>
                    </div>
                </div>

                {/* <div className="row mt-4">
                    <div className="col-12 text-center" style={{ color: "white" }}>
                        <h2>Quick Links</h2>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/mission">Our Mission</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default MainPageBody;
