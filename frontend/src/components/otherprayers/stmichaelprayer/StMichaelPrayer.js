// StMichaelPrayer.js
import React from 'react';
import GenericPrayer from '../GenericPrayer';
import stMichaelIcon from './stmichael_icon.png';

const StMichaelPrayer = () => {
    const prayerTitle = 'Prayer to Saint Michael';
    const prayerText = `St. Michael the Archangel, 
    defend us in battle. 
    Be our defense against the wickedness and snares of the Devil. 
    May God rebuke him, we humbly pray, 
    and do thou, 
    O Prince of the heavenly hosts, 
    by the power of God, 
    thrust into hell Satan, 
    and all the evil spirits, 
    who prowl about the world 
    seeking the ruin of souls. Amen. `; // The actual prayer text

    return (
        <GenericPrayer 
            prayerTitle={prayerTitle} 
            prayerText={prayerText} 
            iconSrc={stMichaelIcon} 
        />
    );
};

export default StMichaelPrayer;
