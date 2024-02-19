import React from 'react';
import GenericPrayer from '../GenericPrayer';
import stLeandroRuizIcon from './stleandroruiz_icon.png';

const StLeandroRuizPrayer = () => {
    const prayerTitle = 'Prayer to Saint Leandro Ruiz';
    const prayerText = ({ fontSize, increaseFontSize, decreaseFontSize }) => {
        return(
            <>
                <div className="parent-container" style={{ textAlign: 'left' }}>
                    <div className="row mt-4">
                        <div className="col-12">
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
                                O most merciful and almighty God,
                                You bestowed as gift to Lorenzo Ruiz
                                The strength to withstand
                                The overpowering forces of death
                                For the sake of his faith in You.
                            </p>
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
                                Through his prayers,
                                Help us to follow his example
                                By overcoming all life’s trials
                                And eventually, increase
                                Our hope and love in You.
                            </p>
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
                                O St. Lorenzo Ruiz,
                                You brought honor to your country,
                                Having been a level-headed
                                And prudent father of the family,
                                A witness of Christ in your life
                                Until your death.
                            </p>
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
                                We present all our petitions
                                To God through your help
                                So that by our actions,
                                We may know more and love more
                                Jesus our Lord and Savior.
                            </p>
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
                                We humbly implore
                                Your intercession O dear St. Lorenzo,
                                For the infinite glory of God
                                And in honor of your triumph
                                As a martyr of Christ
                                And defender of Christianity.
                            </p>
                            <p style={{ color: 'blue', fontSize: `${fontSize}px` }}>
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
            iconSrc={stLeandroRuizIcon} 
            showIntentions={false}
            prayerType={`St. Leandro Ruiz Prayer`}
            modalId={`stleandroruiz`}
        />
    );
};

export default StLeandroRuizPrayer;
