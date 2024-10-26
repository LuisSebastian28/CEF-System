import React from 'react';

export const FilterButtons = ({ filter, setFilter, setCurrentPage }) => {
    const filters = [
        { label: 'All', value: 'All' },
        { label: '5-Day Clubs', value: 'fivedayclub' },
        { label: 'Good News Day Camps', value: 'goodnewsdaycamp' },
        { label: 'Teacher Training Classes', value: 'teachertrainingclass' },
        { label: 'Good News Clubs', value: 'goodnewsclub' },
        { label: 'Released Times', value: 'releasedtimes' },
    ];

    return (
        <div className="flex space-x-2">
            {filters.map(({ label, value }) => (
                <button
                    key={value}
                    className={`px-4 py-2 ${filter === value ? 'bg-black text-white' : 'bg-gray-200'} rounded`}
                    onClick={() => {
                        setFilter(value);
                        setCurrentPage(1);
                    }}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};
