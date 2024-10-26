import React from 'react';

export const OptionCard = ({ title, description, onClick, isSelected }) => (
  <div 
    onClick={onClick} 
    className={`border p-2 md:p-4 rounded-lg cursor-pointer text-center shadow-md hover:shadow-lg transition-all duration-300
                ${isSelected ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-black'} `}
  >
    <h3 className="font-bold text-md md:text-lg">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);
