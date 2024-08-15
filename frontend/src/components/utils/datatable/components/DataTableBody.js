// src/components/utils/datatable/DataTableBody.js

import React from 'react';
import { formatDate } from '../../formatDate';

const DataTableBody = ({ currentPageData, columns, checkbox, handleCheckboxChange, selectedRows, expandedRows, toggleRowExpansion }) => (
    <tbody>
        {currentPageData.map((row, rowIndex) => (
            <React.Fragment key={row._id}>
                <tr className={rowIndex === 0 ? 'first-row' : ''} onClick={() => toggleRowExpansion(row._id)}>
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
                {expandedRows.includes(row._id) && (
                    <tr>
                        <td colSpan={columns.length + (checkbox ? 1 : 0)}>
                            <div className="sub-row-content">
                                {/* Customize this section with controls or information about the user */}
                                <button onClick={() => console.log(`Manage user: ${row.username}`)}>Manage</button>
                                <button onClick={() => console.log(`Send email to: ${row.email}`)}>Send Email</button>
                            </div>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ))}
    </tbody>
);

export default DataTableBody;
