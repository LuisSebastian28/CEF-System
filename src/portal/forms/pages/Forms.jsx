import React, { useState } from 'react';
import { OptionCard } from '../components/OptionSelector';
import { FiveDayClubForm } from '../components/FiveDayClubForms';
import { GoodNewsCampForm } from '../components/GoodNewsCampForms';
import { TeacherTrainingForm } from '../components/TeacherTrainingForm';

export const Forms = () => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Forms</h1>
      <h2 className="text-2xl font-semibold mb-4 text-center">Choose an option</h2>

      <div className="flex justify-around mb-8">
        <OptionCard 
          title="5-Day Club" 
          description="Join our 5-day program filled with fun activities and learning." 
          onClick={() => setSelectedOption('5-Day Club')} 
        />
        <OptionCard 
          title="GoodNews Camp" 
          description="Discover our camp filled with good news and adventures." 
          onClick={() => setSelectedOption('GoodNews Camp')} 
        />
        <OptionCard 
          title="Teacher Training Classes" 
          description="Improve your teaching skills with our training classes." 
          onClick={() => setSelectedOption('Teacher Training Classes')} 
        />
      </div>

      {selectedOption === '5-Day Club' && <FiveDayClubForm />}
      {selectedOption === 'GoodNews Camp' && <GoodNewsCampForm />}
      {selectedOption === 'Teacher Training Classes' && <TeacherTrainingForm />}
    </div>
  );
};
