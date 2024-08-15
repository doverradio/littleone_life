// src/components/mass/helpers/massFormHelpers.js

export const handleManualChurchChange = (e, setManualChurchData, manualChurchData) => {
    setManualChurchData({
        ...manualChurchData,
        [e.target.name]: e.target.value,
    });
};

export const handleManualChurchSubmit = (e, addChurchToMassOptions, manualChurchData, setManualChurchData) => {
    e.preventDefault();
    addChurchToMassOptions(manualChurchData);
    setManualChurchData({
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
};

export const handleZipCodeSearch = async (zipCode, token, setZipCodeChurches) => {
    try {
        const response = await fetch(`/api/churches?zipCode=${zipCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setZipCodeChurches(data);
    } catch (error) {
        console.error('Error fetching churches by zip code:', error);
    }
};

export const addChurchToMassOptions = (church, setPendingChurches, pendingChurches) => {
    setPendingChurches([...pendingChurches, church]);
};

export const savePendingChurches = async (pendingChurches, userId, token, setUserChurches, setPendingChurches, setShowChurchForm) => {
    try {
        const response = await fetch(`/api/churches/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ churches: pendingChurches }),
        });
        const data = await response.json();
        setUserChurches(data);
        setPendingChurches([]);
        setShowChurchForm(false);
    } catch (error) {
        console.error('Error saving pending churches:', error);
    }
};