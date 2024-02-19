// StMichaelPrayer.js
import React from 'react';
import GenericPrayer from '../GenericPrayer';
import stMichaelIcon from './stmichael_icon.png';

const StMichaelPrayer = () => {
    const prayerTitle = 'Prayer to Saint Michael';
    const prayerText = ({ fontSize, increaseFontSize, decreaseFontSize }) => {
        return(
            <>
                <div className="parent-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
                    <div className="row mt-4">
                        <div className="col-12">
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>St. Michael the Archangel,</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>defend us in battle.</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>Be our defense against the wickedness and snares of the Devil.</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>May God rebuke him, we humbly pray,</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>and do thou,</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>O Prince of the heavenly hosts,</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>by the power of God,</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>thrust into hell Satan,</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>and all the evil spirits,</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>who prowl about the world</p>
                            <p className="prayer-line" style={{ color: 'blue', fontSize: `${fontSize}px`, paddingLeft: '10px' }}>seeking the ruin of souls. Amen.</p>
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
