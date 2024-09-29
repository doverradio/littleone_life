// src/components/mass/components/ChurchFormToggle.js

import React from 'react';
import ManualEntryForm from './ManualEntryForm';
import './ChurchFormToggle.css';

const ChurchFormToggle = ({
    isChurchFormVisible,
    toggleChurchForm,
    showChurchForm,
    setShowChurchForm,
    submitNewChurch,
    handleChurchChange,
    newChurch,
    manualChurchData,
    setManualChurchData,
    handleManualChurchSubmit,
    zipCode,
    setZipCode,
    handleZipCodeSearch,
    zipCodeChurches,
    addChurchToMassOptions,
    userId,
    setUserChurches,
    setNearbyChurches,
    handleManualChurchChange,
    setZipCodeChurches
}) => {
    return (
        <>
            <button className="btn btn-outline-secondary mt-3" onClick={toggleChurchForm}>
                {isChurchFormVisible ? 'Hide Church Form' : 'Add New Church'}
            </button>
            {isChurchFormVisible && (
                <div className="w-100">
                    <div className="d-flex justify-content-center mt-3">
                        <ManualEntryForm
                            showChurchForm={showChurchForm}
                            setShowChurchForm={setShowChurchForm}
                            submitNewChurch={submitNewChurch}
                            handleChurchChange={handleChurchChange}
                            newChurch={newChurch}
                            manualChurchData={manualChurchData}
                            handleManualChurchChange={(e) => handleManualChurchChange(e, setManualChurchData, manualChurchData)}
                            handleManualChurchSubmit={(e) => handleManualChurchSubmit(e, (church) => addChurchToMassOptions(userId, church, setUserChurches, setNearbyChurches), manualChurchData, setManualChurchData)}
                            zipCode={zipCode}
                            setZipCode={setZipCode}
                            handleZipCodeSearch={() => handleZipCodeSearch(zipCode, setZipCodeChurches)}
                            zipCodeChurches={zipCodeChurches}
                            addChurchToMassOptions={(church) => addChurchToMassOptions(userId, church, setUserChurches, setNearbyChurches)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ChurchFormToggle;
