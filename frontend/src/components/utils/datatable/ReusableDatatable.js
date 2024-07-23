import React, { useState, useEffect } from 'react';
import DataTableHeader from './components/DataTableHeader';
import DataTableBody from './components/DataTableBody';
import DataTablePagination from './components/DataTablePagination';
import DataTableFilters from './components/DataTableFilters';
import { sortData } from '../sorting';
import { filterData } from '../filterData';
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

    const handleDeleteAction = () => {
        if (selectedRows.length > 0) {
            onDelete(selectedRows.map(row => row._id));
        }
    };

    const handleDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete the selected rows?')) {
            onDelete(selectedRows);
        }
    };

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentPageData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleCheckboxChange = (row) => {
        if (selectedRows.includes(row)) {
            setSelectedRows(selectedRows.filter(selectedRow => selectedRow !== row));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
    };

    const handleSelectAllChange = () => {
        if (selectedRows.length === currentPageData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(currentPageData);
        }
    };

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
                    handleSelectAllChange={handleSelectAllChange}
                    allRowsSelected={selectedRows.length === currentPageData.length}
                />
                <DataTableBody 
                    currentPageData={currentPageData}
                    columns={columns}
                    checkbox={checkbox}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedRows={selectedRows}
                />
            </table>

            <DataTablePagination 
                totalPages={totalPages}
                goToPage={goToPage}
            />
        </div>
    );
};

export default ReusableDatatable;
