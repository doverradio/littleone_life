import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DataTableFilters = ({
    filterOpen,
    setFilterOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedMystery,
    setSelectedMystery
}) => {

    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setSelectedMystery('');
    };

    return (
        <>
            <div className="datatable-filter-btn">
                <button 
                    onClick={() => setFilterOpen(!filterOpen)}
                    className='btn btn-primary btn-sm m-3'
                    title={filterOpen ? 'Close Filters' : 'Open Filters'}
                >
                    {filterOpen ? '❌' : '🔍'}
                </button>
            </div>

            {filterOpen && (
                <div className="datatable-filter-card card m-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <label>Start Date:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    isClearable
                                    placeholderText="Select start date"
                                    title="Select the start date for filtering"
                                    className="form-control"
                                />
                            </div>
                            <div className="col">
                                <label>End Date:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    isClearable
                                    placeholderText="Select end date"
                                    title="Select the end date for filtering"
                                    className="form-control"
                                />
                            </div>
                            <div className="col">
                                <label>Mystery:</label>
                                <select 
                                    className="form-control"
                                    value={selectedMystery}
                                    onChange={e => setSelectedMystery(e.target.value)}
                                    title="Select the mystery for filtering"
                                >
                                    <option value="">All</option>
                                    <option value="Joyful">Joyful</option>
                                    <option value="Sorrowful">Sorrowful</option>
                                    <option value="Glorious">Glorious</option>
                                    <option value="Luminous">Luminous</option>
                                </select>
                            </div>
                            <div className="col d-flex align-items-end">
                                <button 
                                    onClick={resetFilters} 
                                    className='btn btn-light btn-sm w-100'
                                    title="Reset all filters"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataTableFilters;
