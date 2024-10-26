import React, { useState } from 'react';
import { OptionCard } from '../components/OptionSelector';
import { ClubForm } from '../components/clubForm';
import { formFields } from '../helpers/formConfigs'; // Asegúrate de que la ruta sea correcta

export const Forms = () => {
  const [selectedOption, setSelectedOption] = useState('');

  // Verifica que formFields esté definido antes de mapearlo
  if (!formFields) {
    return <div>Error: formFields is not defined.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Forms</h1>
      <h2 className="text-2xl font-semibold mb-4 text-center">Choose an option</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {Object.keys(formFields).map((option) => (
          <OptionCard
            key={option}
            title={option}
            onClick={() => setSelectedOption(option)}
            isSelected={selectedOption === option}
          />
        ))}
      </div>

      {selectedOption && <ClubForm eventType={selectedOption} />}
    </div>
  );
};
