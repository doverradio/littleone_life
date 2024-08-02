// src/components/confession/components/ConfessionHeader.js
import React from 'react';

const ConfessionHeader = ({ activeTab, setActiveTab }) => {
    return (
        <div className="confession-header">
            <h1>Confession</h1>
            <div className="tab-navigation">
                <a href="#!" className={activeTab === 'Form' ? 'active' : ''} onClick={() => setActiveTab('Form')}>Form</a>
                <a href="#!" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#!" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#!" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>
            </div>
        </div>
    );
};

export default ConfessionHeader;
