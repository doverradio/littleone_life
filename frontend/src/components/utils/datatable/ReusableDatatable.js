import React, { useState, useEffect } from 'react';
import './styles.css'

const ReusableDatatable = ({ data, columns, pageSize, checkbox, onRowSelect, onDelete, refreshTrigger }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    // Initially sort and set data
    useEffect(() => {
        setSortedData(data); // Replace with actual sorting logic if needed
        setSelectedRows([]);
    }, [data, refreshTrigger]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strHours = hours < 10 ? '0' + hours : hours;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear()} ${strHours}:${strMinutes} ${ampm}`;
        return formattedDate;
    };

    const handleDeleteAction = () => {
        if (selectedRows.length > 0) {
            onDelete(selectedRows.map(row => row._id)); // Or the correct field for ID
        }
    };
    

    // Function to handle delete click
    const handleDeleteClick = () => {
        if(window.confirm('Are you sure you want to delete the selected rows?')) {
            onDelete(selectedRows);
        }
    };    

    // Calculate the number of total pages
    const totalPages = Math.ceil(data.length / pageSize);

    // Handle the logic to change page
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current page data
    const currentPageData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Handle row selection
    const handleCheckboxChange = (row) => {
        if (selectedRows.includes(row)) {
            setSelectedRows(selectedRows.filter(selectedRow => selectedRow !== row));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
    };

    // Call the onRowSelect callback function when selected rows change
    useEffect(() => {
        if (onRowSelect) {
            onRowSelect(selectedRows);
        }
    }, [selectedRows, onRowSelect]);

    return (
        <div className='datatable-container mt-5'>
            {selectedRows.length > 0 && (
                <div className="datatable-delete-btn">
                    <button 
                        onClick={handleDeleteAction}
                        className='btn btn-danger btn-sm m-1'
                    >
                        Delete Selected
                    </button>
                </div>
            )}
            <table className='datatable'>
                <thead>
                    <tr>
                        {checkbox && <th>Select</th>}
                        {columns.map(column => (
                            <th key={column.accessor}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {checkbox && (
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedRows.includes(row)}
                                        onChange={() => handleCheckboxChange(row)} 
                                    />
                                </td>
                            )}
                            {columns.map(column => (
                                <td key={column.accessor}>
                                    {column.isDate ? formatDate(row[column.accessor]) : row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="datatable-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button key={pageNumber} onClick={() => goToPage(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReusableDatatable;
