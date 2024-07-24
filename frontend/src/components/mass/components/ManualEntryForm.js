import React from 'react';
import ChurchForm from '../form/ChurchForm'; // Adjust the path if needed

const ManualEntryForm = ({
    showChurchForm,
    setShowChurchForm,
    submitNewChurch,
    handleChurchChange,
    newChurch,
    manualChurchData,
    handleManualChurchChange,
    handleManualChurchSubmit,
    zipCode,
    setZipCode,
    handleZipCodeSearch,
    zipCodeChurches,
    addChurchToMassOptions,
}) => (
    <div>
        {showChurchForm && (
            <ChurchForm
                newChurch={newChurch}
                handleChurchChange={handleChurchChange}
                submitNewChurch={submitNewChurch}
                setShowChurchForm={setShowChurchForm}
            />
        )}
        <form onSubmit={handleManualChurchSubmit}>
            <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Church Name"
                value={manualChurchData.name}
                onChange={handleManualChurchChange}
                required
            />
            <input
                type="text"
                name="address"
                className="form-control mb-2"
                placeholder="Address"
                value={manualChurchData.address}
                onChange={handleManualChurchChange}
                required
            />
            <input
                type="text"
                name="city"
                className="form-control mb-2"
                placeholder="City"
                value={manualChurchData.city}
                onChange={handleManualChurchChange}
                required
            />
            <input
                type="text"
                name="state"
                className="form-control mb-2"
                placeholder="State"
                value={manualChurchData.state}
                onChange={handleManualChurchChange}
                required
            />
            <input
                type="text"
                name="country"
                className="form-control mb-2"
                placeholder="Country"
                value={manualChurchData.country}
                onChange={handleManualChurchChange}
                required
            />
            <input
                type="text"
                name="zipCode"
                className="form-control mb-2"
                placeholder="Zip Code"
                value={manualChurchData.zipCode}
                onChange={handleManualChurchChange}
                required
            />
            <input
                type="text"
                name="phone"
                className="form-control mb-2"
                placeholder="Phone"
                value={manualChurchData.phone}
                onChange={handleManualChurchChange}
            />
            <input
                type="text"
                name="website"
                className="form-control mb-2"
                placeholder="Website"
                value={manualChurchData.website}
                onChange={handleManualChurchChange}
            />
            <textarea
                name="additionalInfo"
                className="form-control mb-2"
                placeholder="Additional Info"
                value={manualChurchData.additionalInfo}
                onChange={handleManualChurchChange}
            />
            <button type="submit" className="btn btn-primary">Add Church</button>
        </form>
        <div className="mt-3">
            <input 
                type="text"
                className="form-control"
                placeholder="Enter Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
            />
            <button 
                className="btn btn-primary mt-2"
                onClick={handleZipCodeSearch}
            >
                Search Churches by Zip Code
            </button>
        </div>
        <div className="mt-3">
            <select 
                className="form-control"
                onChange={(e) => {
                    const selectedChurch = zipCodeChurches.find(church => church._id === e.target.value);
                    if (selectedChurch) addChurchToMassOptions(selectedChurch);
                }}
            >
                <option value="">Select Church</option>
                {zipCodeChurches.map(church => (
                    <option key={church._id} value={church._id}>{church.name}</option>
                ))}
            </select>
        </div>
    </div>
);

export default ManualEntryForm;
