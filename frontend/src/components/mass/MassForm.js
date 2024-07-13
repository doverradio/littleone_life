import React, { useState } from 'react';
import Map from '../map/Map';
import { createChurch } from '../../api/church';
import { isAuthenticated } from '../../api/auth';

const MassForm = ({ setSelectedChurch }) => {
    const [showChurchForm, setShowChurchForm] = useState(false);
    const [newChurch, setNewChurch] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: '',
        website: '',
        additionalInfo: '',
    });

    const {
        user: { _id },
        token
    } = isAuthenticated();

    const handleChurchChange = (e) => {
        setNewChurch({ ...newChurch, [e.target.name]: e.target.value });
    };

    const submitNewChurch = async (e) => {
        e.preventDefault();
        try {
            const response = await createChurch({ ...newChurch, users: [_id] }, token);
            if (response) {
                setSelectedChurch(response);
                setShowChurchForm(false);
                setNewChurch({
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    zipCode: '',
                    phone: '',
                    website: '',
                    additionalInfo: '',
                });
            }
        } catch (error) {
            console.error("Error creating church:", error);
        }
    };

    return (
        <div>
            <Map setSelectedChurch={setSelectedChurch} />
            {showChurchForm && (
                <form onSubmit={submitNewChurch}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Church Name"
                        value={newChurch.name}
                        onChange={handleChurchChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={newChurch.address}
                        onChange={handleChurchChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newChurch.city}
                        onChange={handleChurchChange}
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={newChurch.state}
                        onChange={handleChurchChange}
                    />
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={newChurch.zipCode}
                        onChange={handleChurchChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={newChurch.phone}
                        onChange={handleChurchChange}
                    />
                    <input
                        type="text"
                        name="website"
                        placeholder="Website"
                        value={newChurch.website}
                        onChange={handleChurchChange}
                    />
                    <textarea
                        name="additionalInfo"
                        placeholder="Additional Info"
                        value={newChurch.additionalInfo}
                        onChange={handleChurchChange}
                    />
                    <button type="submit">Create Church</button>
                </form>
            )}
        </div>
    );
};

export default MassForm;
