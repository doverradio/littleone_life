import React from 'react';

const ChurchForm = ({ showChurchForm, submitNewChurch, handleChurchChange, newChurch, setShowChurchForm }) => (
    <div className="form-container">
        {showChurchForm && (
            <form onSubmit={submitNewChurch}>
                <textarea
                    rows={3}
                    name="name" 
                    placeholder="Church Name" 
                    className='form-control m-1'
                    onChange={handleChurchChange}
                    value={newChurch.name} 
                    required 
                />
                <input
                    type="text"
                    name="address" 
                    placeholder="Address" 
                    className='form-control m-1'
                    onChange={handleChurchChange}
                    value={newChurch.address} 
                />
                <input
                    type="text"
                    name="city" 
                    placeholder="City" 
                    className='form-control m-1'
                    onChange={handleChurchChange}
                    value={newChurch.city} 
                />
                <input
                    type="text"
                    name="state" 
                    placeholder="State" 
                    className='form-control m-1'
                    onChange={handleChurchChange}
                    value={newChurch.state} 
                />
                <input
                    type="text"
                    name="zipCode" 
                    placeholder="Zip" 
                    className='form-control m-1'
                    onChange={handleChurchChange}
                    value={newChurch.zipCode} 
                />
                <input
                    type="text"
                    name="phone" 
                    placeholder="Phone" 
                    className='form-control m-1'
                    onChange={handleChurchChange}
                    value={newChurch.phone} 
                />
                <input
                    type="text"
                    name="website" 
                    placeholder="Website" 
                    className='form-control m-1'
                    onChange={handleChurchChange}
                    value={newChurch.website} 
                />
                <button className='btn btn-primary btn-sm m-1' type="submit">Create Church</button>
                <button className='btn btn-danger btn-sm m-1' onClick={() => setShowChurchForm(false)}>Cancel</button>
            </form>
        )}
    </div>
);

export default ChurchForm;
