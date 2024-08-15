// src/components/utils/datatable/ReusableDatatable.js

import React, { useState, useEffect } from 'react';
import DataTableHeader from './components/DataTableHeader';
import DataTableBody from './components/DataTableBody';
import DataTablePagination from './components/DataTablePagination';
import DataTableFilters from './components/DataTableFilters';
import { sortData } from '../sorting';
import { filterData } from '../filterData';
import {
    handleDeleteAction,
    handleDeleteClick,
    calculateTotalPages,
    goToPage,
    getCurrentPageData,
    handleCheckboxChange,
    handleSelectAllChange,
    toggleRowExpansion
} from './datatableHelpers';
import './styles.css';

const ReusableDatatable = ({ data = [], columns, pageSize, checkbox, onRowSelect, onDelete, refreshTrigger }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
    const [filterOpen, setFilterOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedMystery, setSelectedMystery] = useState('');
    const [expandedRows, setExpandedRows] = useState([]); // State for tracking expanded rows

    const dateField = 'createdAt';

    useEffect(() => {
        let filteredData = filterData(data, startDate, endDate, selectedMystery, dateField);
        const sorted = sortData(filteredData, sortConfig.key, sortConfig.direction);
        setSortedData(sorted);
        setSelectedRows([]);
    }, [data, refreshTrigger, sortConfig, startDate, endDate, selectedMystery]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const totalPages = calculateTotalPages(sortedData, pageSize);

    const currentPageData = getCurrentPageData(sortedData, currentPage, pageSize);

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
                        onClick={() => handleDeleteAction(selectedRows, onDelete)}
                        className='btn btn-danger btn-sm m-1'
                    >
                        Delete Selected
                    </button>
                </div>
            )}

            <DataTableFilters 
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                selectedMystery={selectedMystery}
                setSelectedMystery={setSelectedMystery}
            />

            <table className='datatable'>
                <DataTableHeader 
                    columns={columns}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    checkbox={checkbox}
                    handleSelectAllChange={() => handleSelectAllChange(selectedRows, setSelectedRows, currentPageData)}
                    allRowsSelected={selectedRows.length === currentPageData.length}
                />
                <DataTableBody 
                    currentPageData={currentPageData}
                    columns={columns}
                    checkbox={checkbox}
                    handleCheckboxChange={(row) => handleCheckboxChange(selectedRows, setSelectedRows, row)}
                    selectedRows={selectedRows}
                    expandedRows={expandedRows}
                    toggleRowExpansion={(rowId) => toggleRowExpansion(expandedRows, setExpandedRows, rowId)} // Pass toggle function
                />
            </table>

            <DataTablePagination 
                totalPages={totalPages}
                goToPage={(pageNumber) => goToPage(setCurrentPage, pageNumber)}
            />
        </div>
    );
};

export default ReusableDatatable;
