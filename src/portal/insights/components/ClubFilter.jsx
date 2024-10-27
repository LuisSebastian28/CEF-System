import React from 'react';

const eventTypes = [
  { value: 'all', label: 'All Clubs' },
  { value: 'fivedayclub', label: '5-Day Club' },
  { value: 'goodnewsdaycamp', label: 'Good News Camp' },
  { value: 'teachertrainingclass', label: 'Teacher Training' },
  { value: 'goodnewsclub', label: 'Good News Club' },
  { value: 'releasedtimes', label: 'Released Time' },
];

export const ClubFilter = ({ selectedType, onFilterChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by:</h3>
    <div className="space-y-2">
      {eventTypes.map((type) => (
        <button
          key={type.value}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-150 ${
            selectedType === type.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onFilterChange(type.value)}
        >
          {type.label}
        </button>
      ))}
    </div>
  </div>
);
