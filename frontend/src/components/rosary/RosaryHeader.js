import React from 'react';
import rosaryIcon from './rosary_icon.png'; // Adjust the path to where your icon is stored

const RosaryHeader = ({ activeTab, setActiveTab }) => {
    return (
        <>
            <header className="rosary-header">
                <img src={rosaryIcon} alt="Rosary" className="rosary-icon" />
                <h1>Rosary</h1>
            </header>
            <nav className="rosary-nav">
                <a href="#questions" className={activeTab === 'Questions' ? 'active' : ''} onClick={() => setActiveTab('Questions')}>Questions</a>
                <a href="#prayers" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#responses" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#settings" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>
            </nav>
        </>
    );
};

export default RosaryHeader;
