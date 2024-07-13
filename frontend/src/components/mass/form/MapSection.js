import React, { useState, useEffect } from 'react';
import Map from '../../map/Map';
import ReusableDatatable from '../../utils/datatable/ReusableDatatable';

const MapSection = ({ addChurchToPendingList, distance, setDistance, nearbyChurches, setNearbyChurches }) => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [unit, setUnit] = useState('miles');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAHbrprZ2-514b9KtV5ixaoBaQLgYq_oM0`)
                    .then(response => response.json())
                    .then(data => {
                        const country = data.results[0].address_components.find(component => component.types.includes("country")).short_name;
                        if (country !== "US") {
                            setUnit('kilometers');
                        }
                    })
                    .catch(error => console.error('Error determining location:', error));
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (/^\d*$/.test(value)) {
            setIsValid(true);
            setDistance(Number(value));
        } else {
            setIsValid(false);
        }
    };

    return (
        <div>
            <label htmlFor="distance">Distance ({unit}): </label>
            <input
                id="distance"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`Distance in ${unit}`}
            />
            {!isValid && <p style={{ color: 'red' }}>Please enter a valid number.</p>}
            <Map setNearbyChurches={setNearbyChurches} distance={distance} />
            <ReusableDatatable
                data={nearbyChurches}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Address', accessor: 'address' },
                    { header: 'Distance (meters)', accessor: 'distance' },
                ]}
                pageSize={10}
                checkbox={true}
                onRowSelect={(selectedRows) => {
                    selectedRows.forEach(church => addChurchToPendingList(church));
                }}
                onDelete={() => {}}
            />
        </div>
    );
};

export default MapSection;
