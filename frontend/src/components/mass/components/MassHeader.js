import React from 'react';
import massIcon from '../mass_icon.png'; // Adjust the path to where your icon is stored

const MassHeader = ({ activeTab, setActiveTab }) => {
    return (
        <>
            <header className="mass-header">
                <img src={massIcon} alt="Mass" className="mass-icon" />
                <h1>Mass</h1>
            </header>
            <nav className="mass-nav">
                <a href="#form" className={activeTab === 'Form' ? 'active' : ''} onClick={() => setActiveTab('Form')}>Form</a>
                <a href="#prayers" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#responses" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#settings" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>
            </nav>
        </>
    );
};

export default MassHeader;
