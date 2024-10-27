import React, { useState } from 'react';
import { OptionCard } from '../components/OptionSelector';
import { ClubForm } from '../components/clubForm';
import { formFields } from '../helpers/formConfigs'; // Asegúrate de que la ruta sea correcta

export const Forms = () => {
  const [selectedOption, setSelectedOption] = useState('');

  // Verifica que formFields esté definido antes de mapearlo
  if (!formFields) {
    return <div className="text-red-500 font-semibold text-center">Error: formFields is not defined.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Forms</h1>
      <h2 className="text-xl font-medium text-gray-600 mb-8 text-center">Choose an option</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {Object.keys(formFields).map((option) => (
          <OptionCard
            key={option}
            title={option}
            onClick={() => setSelectedOption(option)}
            isSelected={selectedOption === option}
            className={`p-6 border rounded-lg text-center shadow-md cursor-pointer transition-transform transform ${
              selectedOption === option ? 'bg-blue-500 text-white scale-105' : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
            }`}
          />
        ))}
      </div>

      {selectedOption ? (
        <div className="p-6 bg-white rounded-lg shadow-lg transition-opacity duration-300 ease-in-out">
          <ClubForm eventType={selectedOption} />
        </div>
      ) : (
        <div className="text-center text-gray-500 italic">Please select an option to fill out the form.</div>
      )}
    </div>
  );
};
