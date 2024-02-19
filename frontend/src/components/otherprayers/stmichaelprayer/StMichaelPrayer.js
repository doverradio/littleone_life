// StMichaelPrayer.js
import React from 'react';
import GenericPrayer from '../GenericPrayer';
import stMichaelIcon from './stmichael_icon.png';

const StMichaelPrayer = () => {
    const prayerTitle = 'Prayer to Saint Michael';
    const prayerText = ({ fontSize, increaseFontSize, decreaseFontSize }) => {
        return(
            <>
                <div className="parent-container" style={{ textAlign: 'left' }}>
                    <div className="row mt-4">
                        <div className="col-12">
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
                                St. Michael the Archangel, 
                                defend us in battle. 
                                Be our defense against the wickedness and snares of the Devil. 
                                May God rebuke him, we humbly pray, 
                                and do thou, 
                                O Prince of the heavenly hosts, 
                                by the power of God, 
                                thrust into hell Satan, 
                                and all the evil spirits, 
                                who prowl about the world 
                                seeking the ruin of souls. Amen. 
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <GenericPrayer 
            prayerTitle={prayerTitle} 
            prayerText={prayerText} 
            iconSrc={stMichaelIcon} 
            showIntentions={false}
            prayerType={`St. Michael Prayer`}
            modalId={`stMichaelPrayer`}
        />
    );
};

export default StMichaelPrayer;
