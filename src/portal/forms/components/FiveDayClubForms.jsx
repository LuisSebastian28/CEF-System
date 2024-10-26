import React from 'react';
import { ClubForm } from './clubForm';

const fiveDayClubConfig = {
  defaultValues: {
    club: '',
    date: '',
    time: '',
    hostess: '',
    phone: '',
    eventType: 'fivedayclub',
    offering: '00.00'
  },
  fields: [
    { id: 'club', label: 'Club' },
    { id: 'date', label: 'Date', type: 'date' },
    { id: 'time', label: 'Time', type: 'time' },
    { id: 'hostess', label: 'Hostess' },
    { id: 'phone', label: 'Phone' },
    { id: 'offering', label: 'Offering' }
  ],
  requiredFields: ['club', 'date', 'time', 'hostess', 'phone']
};

export const FiveDayClubForm = () => <ClubForm formConfig={fiveDayClubConfig} />;
