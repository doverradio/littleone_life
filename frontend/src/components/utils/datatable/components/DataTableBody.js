import React from 'react';
import { formatDate } from '../../formatDate';

const DataTableBody = ({ currentPageData, columns, checkbox, handleCheckboxChange, selectedRows }) => (
    <tbody>
        {currentPageData.map((row, rowIndex) => (
            <tr key={row._id} className={rowIndex === 0 ? 'first-row' : ''}>
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
);

export default DataTableBody;
