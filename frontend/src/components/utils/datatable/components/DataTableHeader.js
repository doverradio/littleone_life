import React from 'react';

const DataTableHeader = ({ columns, sortConfig, handleSort, checkbox, handleSelectAllChange, allRowsSelected }) => (
    <thead>
        <tr>
            {checkbox && (
                <th>
                    <input 
                        type="checkbox" 
                        checked={allRowsSelected}
                        onChange={handleSelectAllChange} 
                    />
                </th>
            )}
            {columns.map(column => (
                <th key={column.accessor} onClick={() => handleSort(column.accessor)}>
                    {column.header}
                    {sortConfig.key === column.accessor && (
                        <span>{sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}</span>
                    )}
                </th>
            ))}
        </tr>
    </thead>
);

export default DataTableHeader;
