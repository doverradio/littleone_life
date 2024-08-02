import React from "react";

const ConfessionPrayers = ({
    decreaseFontSize,
    increaseFontSize,
    fontSize,
    confessionImage,
}) => {
    return(
        <>
            <div>
                {/* Content for Prayers tab */}
                    {/* Font Size Controls */}
                    <div className="text-size-controls">
                        Text Size
                        <button 
                            onClick={decreaseFontSize}
                            className='btn btn-outline-secondary btn-sm m-1'
                        >
                            -
                        </button>
                        <button 
                            onClick={increaseFontSize}
                            className='btn btn-outline-secondary btn-sm m-1'
                        >
                            +
                        </button>
                    </div>
                    
                    <div className="row mb-5">
                        <div className="col-12">
                            <h2 style={{ fontSize: '25px' }} className="text-center m-1">
                                Guide to a Catholic Confession
                            </h2>
                            <p style={{ fontSize: `${fontSize}px` }}>
                                Churches typically provide a designated weekly schedule for members of the congregation to participate in the sacrament of confession.
                            </p>
                            <div className='mb-3'>
                                <img 
                                    src={confessionImage}
                                    alt="confession image" 
                                    style={{
                                        height: '250px',
                                        width: '250px'
                                    }}
                                />
                            </div>
                            <div className='' style={{ textAlign: 'left', fontSize: `${fontSize}px` }}>
                                <p>
                                    1. <strong>Entering the Confessional and Greeting the Priest.</strong> <br />
                                    Start by entering the confessional booth and greeting the priest. Initiate the sacrament by making the sign of the cross and saying<br />
                                    <span style={{ color: 'blue' }}>    
                                        Forgive me Father, for I have sinned. My sins are...
                                    </span>
                                </p>
                                <p>
                                    2. <strong>Confessing Your Sins.</strong> Openly confess both venial (minor) sins and mortal (grave) sins.  An example confession could be something like this:<br /> <br />
                                    <span style={{ color: 'blue', fontWeight: 'bold' }}>    
                                        My sins are lust, wrath, sloth, gluttony, and my venial sins are selfishness, pride, and things I haven't done for Christ.  And all my 
                                        sins of <span style={{ textDecoration: 'underline'}} title='Omission: a failure to do something, especially something that one has a moral or legal obligation to do.'>Omission</span>.
                                    </span>
                                    <br /><br />
                                    Of course, you would custom tailor this to your own version.  The point here is do not elaborate it to the point where you take up all the priest's time because
                                    you must be mindful of the limited time you and the priest have.  Other parishioners will need to take their turn too.
                                </p>
                                <p>
                                    For reference, here are the 7 deadly sins:
                                </p>
                                    <ul style={{ fontWeight: 'bold' }}>
                                        <li>Lust</li>
                                        <li>Gluttony</li>
                                        <li>Greed</li>
                                        <li>Sloth</li>
                                        <li>Wrath</li>
                                        <li>Envy</li>
                                        <li>Pride</li>
                                    </ul>
                                <p>
                                    3. <strong>Listening to the Priest's Guidance.</strong> After your confession, the priest might provide spiritual advice and suggest 
                                    ways to avoid sin in the future. He will assign you a penance, which could be prayers, an act of service, or a work of mercy, 
                                    often achievable within the church premises. <br />
                                </p>
                                <p>
                                    4. <strong>Praying the Act of Contrition.</strong> You will then be expected to recite this brief prayer:<br />
                                    <span style={{ color: 'blue' }}>    
                                    O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the Pains of Hell, but most of all because I have offend Thee, my God, 
                                    who art most good and deserving of all my love. And I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life. Amen.
                                    </span>
                                </p>
                                <p>
                                    5. <strong>Receiving Absolution from God through the Priest.</strong> The priest will recite a prayer of absolution: <br />
                                    <span style={{ color: 'blue' }}>    
                                    God, the Father of mercies, through the death and resurrection of His Son, has reconciled the world to Himself and sent the Holy Spirit for the forgiveness of sins. Through the Church’s ministry, 
                                    may God grant you pardon and peace. I absolve you of your sins in the name of the Father, the Son, and the Holy Spirit.
                                    </span>
                                    <br /> <br />
                                    Respond with the sign of the cross and say “<span style={{ color: 'blue' }}>Amen.</span>”

                                </p>
                                <p>
                                    6. <strong>Completing Your Penance and Deepening Your Faith.</strong> <br /> 
                                    Fulfill the penance assigned to you. Embrace this opportunity to deepen your spiritual journey and draw closer to God.   <br />
                                </p>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default ConfessionPrayers