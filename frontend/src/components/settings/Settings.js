// Settings.js
import React from 'react';
import NavbarMain from '../../NavbarMain';
import Footer from '../../Footer';

const Settings = () => {
    return (
        <>
            <NavbarMain />
            <div className="container" style={{ minHeight: '80vh' }}>
                <h2>Settings</h2>
                {/* Your settings form or options go here */}
            </div>
            <Footer />
        </>
    );
};

export default Settings;
