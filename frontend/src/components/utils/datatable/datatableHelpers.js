// src/components/utils/datatable/datatableHelpers.js

export const handleDeleteAction = (selectedRows, onDelete) => {
    if (selectedRows.length > 0) {
        onDelete(selectedRows.map(row => row._id));
    }
};

export const handleDeleteClick = (selectedRows, onDelete) => {
    if (window.confirm('Are you sure you want to delete the selected rows?')) {
        onDelete(selectedRows);
    }
};

export const calculateTotalPages = (sortedData, pageSize) => {
    return Math.ceil(sortedData.length / pageSize);
};

export const goToPage = (setCurrentPage, pageNumber) => {
    setCurrentPage(pageNumber);
};

export const getCurrentPageData = (sortedData, currentPage, pageSize) => {
    return sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
};

export const handleCheckboxChange = (selectedRows, setSelectedRows, row) => {
    if (selectedRows.includes(row)) {
        setSelectedRows(selectedRows.filter(selectedRow => selectedRow !== row));
    } else {
        setSelectedRows([...selectedRows, row]);
    }
};

export const handleSelectAllChange = (selectedRows, setSelectedRows, currentPageData) => {
    if (selectedRows.length === currentPageData.length) {
        setSelectedRows([]);
    } else {
        setSelectedRows(currentPageData);
    }
};

export const toggleRowExpansion = (expandedRows, setExpandedRows, rowId) => {
    setExpandedRows((prevExpandedRows) =>
        prevExpandedRows.includes(rowId)
            ? prevExpandedRows.filter(id => id !== rowId)
            : [...prevExpandedRows, rowId]
    );
};
