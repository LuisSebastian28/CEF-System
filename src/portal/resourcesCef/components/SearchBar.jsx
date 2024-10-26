// src/portal/components/SearchBar.js
import React from 'react';

export const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <div className="flex justify-center mt-4">
        <input
            type="text"
            className="w-3/4 md:w-1/2 p-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            placeholder="Search resource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
);
