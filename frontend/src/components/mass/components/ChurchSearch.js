// src/components/mass/ChurchSearch.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
                    {filterQuery && (
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="clear-icon"
                            onClick={() => setFilterQuery('')}
                        />
                    )}
                </div>
            )}
            <div className="search-icon-container">
                <FontAwesomeIcon
                    icon={isFilterVisible ? faTimesCircle : faSearch}
                    className={`search-icon ${isFilterVisible ? 'red' : ''}`}
                    onClick={toggleFilterVisibility}
                    title={isFilterVisible ? "Close search" : "Search by church name"}
                />
            </div>
        </div>
    );
};

export default ChurchSearch;
