// src/components/utils/filterData.js

export const filterData = (data, startDate, endDate, selectedMystery, dateField) => {
    let filteredData = [...data];

    if (startDate) {
        filteredData = filteredData.filter(row => new Date(row[dateField]) >= startDate);
    }
    if (endDate) {
        filteredData = filteredData.filter(row => new Date(row[dateField]) <= endDate);
    }

    if (selectedMystery && selectedMystery !== '' && selectedMystery !== 'All') {
        filteredData = filteredData.filter(row => row.m === selectedMystery);
    }

    return filteredData;
};
