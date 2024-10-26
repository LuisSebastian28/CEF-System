import React from 'react';

export const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};
