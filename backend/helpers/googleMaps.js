const log = console.log;

const fetchNearbyChurches = async (latitude, longitude, radius) => {
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius * 1609.34}&keyword=Catholic+Church&key=${API_KEY}`; // radius in meters

    try {
        const fetch = (await import('node-fetch')).default;
        // console.log('Fetching nearby churches with URL:', url);
        const response = await fetch(url);
        const data = await response.json();

        // console.log('Google Maps API response:', JSON.stringify(data, null, 2));

        if (data.results) {
            return data.results.map(place => ({
                name: place.name,
                address: place.vicinity,
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
                placeId: place.place_id,
                plus_code: place.plus_code?.compound_code || '',
                rating: place.rating || 0,
                photos: place.photos || [],
                business_status: place.business_status || ''
            }));
        }
    } catch (error) {
        console.error('Error fetching nearby churches:', error);
    }

    return [];
};

const preprocessGoogleData = (rawGoogleData) => {
    const knownMunicipalities = {
        'Venice': 'Los Angeles',
        'Westwood': 'Los Angeles',
        'San Pedro': 'Los Angeles',
        'Brentwood': 'Los Angeles'
    };

    const cityToState = {
        'Los Angeles': 'California',
        'New York': 'New York',
        'Chicago': 'Illinois',
        // Add other cities and their states as needed
    };

    return rawGoogleData.map(church => {
        let { name, address, lat, lng, placeId, plus_code, rating, photos, business_status } = church;

        let city = '';
        let state = ''; // Initialize state as an empty string
        const country = 'USA'; // Assuming the country is USA based on the provided context
        let zipCode = '';

        if (plus_code) {
            const parts = plus_code.split(' ');
            if (parts.length >= 2) {
                const locationParts = parts.slice(1).join(' ').split(',');
                if (locationParts.length >= 2) {
                    city = locationParts[0].trim();
                    state = 'California'; // Default state value, override if needed
                }
            }
        }

        // Extract city from address
        const cityMatch = address.match(/,\s*([^,]+),?$/);
        if (cityMatch) {
            city = cityMatch[1].trim();
            address = address.replace(/,\s*[^,]+,?$/, '').trim();
        }

        // Correct city and state for known municipalities
        if (knownMunicipalities[city]) {
            city = knownMunicipalities[city];
        }

        // Lookup state based on city
        if (cityToState[city]) {
            state = cityToState[city];
        } else {
            state = state || ''; // Default to an empty string if no match is found
        }

        return {
            name,
            address: address.replace(city, '').trim().replace(/,\s*$/, ''),
            city,
            state,
            country,
            zipCode,
            lat,
            lng,
            placeId,
            rating: rating || 0,
            photos: photos && photos.length > 0 ? photos[0].photo_reference : '',
            operationalStatus: business_status === 'OPERATIONAL',
            massTimes: [], // Add default or fetched mass times if available
            phone: '', // Google API doesn't provide phone number directly
            website: '', // Google API doesn't provide website directly
            additionalInfo: '', // Add any additional info if available
            users: [] // This will be populated with the user IDs who have this church saved
        };
    });
};

const mapGoogleDataToDesiredStructure = (nearbyChurches) => {
    // console.log(`Begin mapGoogleDataToDesiredStructure! nearbyChurches: `, JSON.stringify(nearbyChurches, null, 2));
    try {
        return nearbyChurches
            .map(church => {
                const { name, address, lat, lng, placeId, city, state, country, zipCode, rating, photos, business_status } = church;
                if (!lat || !lng) {
                    console.warn('Skipping church due to missing latitude or longitude:', church);
                    return null;
                }

                const photo = photos && photos.length > 0 ? photos[0].photo_reference : '';
                const operationalStatus = business_status === 'OPERATIONAL';

                return {
                    name: name || '',
                    address: address || '',
                    city: city || '',
                    state: state || '',
                    country: country || '',
                    zipCode: zipCode || '',
                    lat: lat || 0,
                    lng: lng || 0,
                    placeId: placeId || '',
                    rating: rating || 0,
                    photo: photo,
                    operationalStatus: operationalStatus,
                    massTimes: [], // Add default or fetched mass times if available
                    phone: '', // Google API doesn't provide phone number directly
                    website: '', // Google API doesn't provide website directly
                    additionalInfo: '', // Add any additional info if available
                    users: [] // This will be populated with the user IDs who have this church saved
                };
            })
            .filter(church => church !== null); // Remove any null entries
    } catch (error) {
        console.error('Error mapping Google data to desired structure:', error);
        return []; // Return an empty array in case of an error
    }
};

module.exports = { fetchNearbyChurches, mapGoogleDataToDesiredStructure, preprocessGoogleData };
