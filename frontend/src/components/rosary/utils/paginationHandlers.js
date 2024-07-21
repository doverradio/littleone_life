// src/components/rosary/utils/paginationHandlers.js
export const handleNextPage = (currentPage, setCurrentPage, rosariesPerPage, totalRosaries) => {
    if (currentPage * rosariesPerPage < totalRosaries) {
        setCurrentPage(currentPage + 1);
    }
};

export const handlePreviousPage = (currentPage, setCurrentPage) => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};
