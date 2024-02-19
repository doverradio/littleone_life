// StFrancisPrayer.js
import React from 'react';
import GenericPrayer from '../GenericPrayer';
import stFrancisIcon from './stfrancis_icon.png';

const StFrancisPrayer = () => {
    const prayerTitle = 'Prayer to Saint Francis';
    const prayerText = ({ fontSize, increaseFontSize, decreaseFontSize }) => {
        return(
            <>
                <div className="parent-container" style={{ textAlign: 'left' }}>
                    <div className="row mt-4">
                        <div className="col-12">
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
                            Lord, make me an instrument of your peace:
                            where there is hatred, let me sow love;
                            where there is injury, pardon;
                            where there is doubt, faith;
                            where there is despair, hope;
                            where there is darkness, light;
                            where there is sadness, joy.
                            O divine Master, grant that I may not so much seek
                            to be consoled as to console,
                            to be understood as to understand,
                            to be loved as to love.
                            For it is in giving that we receive,
                            it is in pardoning that we are pardoned,
                            and it is in dying that we are born to eternal life.
                            Amen.
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
            iconSrc={stFrancisIcon} 
            showIntentions={false}
            prayerType={`St. Francis Prayer`}
            modalId={`stfrancis`}
        />
    );
};

export default StFrancisPrayer;
