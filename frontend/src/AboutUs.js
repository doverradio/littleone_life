import React from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";

const AboutUs = () =>
{
    return(
        <>
            <NavbarMain />
            <div className="container-fluid main-content" style={{ backgroundColor: "black" }}>
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1" style={{ color: 'white' }}>Our Inspiration</h2>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                        In the stirring pages of "
                        <a href="https://www.amazon.com/dp/1480952281" style={{ color: "white" }}>
                            <strong>God's Grand Design: Divine Plan for Eternal Life</strong>
                        </a>," a profound realization blossomed. 
                        A vision of unity, of a silent yet steadfast brotherhood and sisterhood, where each member strives for spiritual 
                        virtues and shares in the collective mission of deepening our relationship with the Divine.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1" style={{ color: 'white' }}>The Mission</h2>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                        We aim to cultivate an army of <strong>Soldiers of the Light</strong> - souls dedicated to a higher calling, devoted to illuminating the 
                        world with grace, compassion, and divine love. Our commitment isn't mere lip service but a genuine pledge to live life 
                        in tandem with the Divine Will. This entails surrendering our personal free will, not out of compulsion but from a profound 
                        love and yearning to be in closer union with our Creator.
                        </p>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                            The following are what is expected from each member that professes to be a Soldier of the Light:
                        </p>
                        <ol>
                            <li style={{ color: 'white' }}>Believe.</li>
                            <li style={{ color: 'white' }}>Fight Evil.</li>
                            <li style={{ color: 'white' }}>Save Others.</li>
                        </ol>

                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1" style={{ color: 'white' }}>The Prayer of Submission</h2>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                            <strong>"Lord, I deny my intellect, I abandon my feelings, and I submit my free will to you."</strong>
                        </p>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                            Each member that wants to be a <strong>Soldier of the Light</strong> must daily either say the <strong>Prayer of Submission</strong> or 
                            attend a <strong>Catholic mass</strong>.  If you attend the mass and take the Eucharist, there is no need to say the Prayer of Submission 
                            because <em>you have already united with Christ for that day</em>.  
                        </p>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                            Each new day, beginning at 12:00 A.M. (midnight), creates a blank page in your life and so too must you again seek to exit your free will and 
                            re-enter the Divine Will.  Through this process, one will truly unite with Christ during their life, and every moment of their life bears fruit 
                            for the Kingdom of God.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1" style={{ color: 'white' }}>The Commitment</h2>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                        At the heart of our community is a simple yet powerful promise: to either say the submission prayer daily or attend the Holy Mass. 
                        While the world often demands much of our time and energy, this sacred commitment ensures that we center ourselves daily in 
                        spiritual reflection and communion with God.
                        </p>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                        While we uphold this practice with utmost seriousness, we trust each member to honor this commitment. There is no oversight or supervision; 
                        rather, we believe in the inherent goodwill and sincerity of every Soldier of the Light.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1" style={{ color: 'white' }}>Our Digital Prayer Diary</h2>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                        Recognizing the importance of consistency in prayer and spiritual practices, our platform offers a unique feature: a digital prayer diary. 
                        Members can tally their rosaries, Divine Mercy Chaplets, and masses attended. This diary serves as a testament to one's dedication and also 
                        as a motivator to remain consistent in one's spiritual journey.
                        </p>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                        For those who wish to reflect upon or share their journey, we provide an option to retrieve the complete record of a member's prayer and mass 
                        history for a nominal fee. This diary not only captures the quantity but symbolizes the quality of time and heart one dedicates to the Divine.
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h2 className="m-1 p-1" style={{ color: 'white' }}>Join Us</h2>
                        <p className="m-1 p-1" style={{ color: 'white' }}>
                        If this resonates with you, if you feel the call to be a Soldier of the Light, we welcome you with open arms. Let us walk this spiritual journey 
                        together, illuminating the path for ourselves and for others.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs