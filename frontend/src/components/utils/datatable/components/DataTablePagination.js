import React from 'react';

const DataTablePagination = ({ totalPages, goToPage }) => (
    <div className="datatable-pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button 
                key={pageNumber} 
                onClick={() => goToPage(pageNumber)}
                className='btn btn-outline-primary btn-sm m-1'
            >
                {pageNumber}
            </button>
        ))}
    </div>
);

export default DataTablePagination;
