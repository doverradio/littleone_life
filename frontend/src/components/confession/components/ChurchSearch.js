// src/components/confession/components/ChurchSearch.js

import React from 'react';
import './ChurchSearch.css';

const ChurchSearch = ({ filterQuery, setFilterQuery, isFilterVisible, toggleFilterVisibility }) => {
    return (
        <div className="search-container">
            {isFilterVisible && (
                <div className="filter-input-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter churches by name, address, or city"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                    />
                </div>
            )}
            <button className="btn btn-secondary" onClick={toggleFilterVisibility}>
                {isFilterVisible ? 'Close Search' : 'Search'}
            </button>
        </div>
    );
};

export default ChurchSearch;
