// src/portal/components/CalendarComponent.jsx
import React from 'react';
import { Calendar as Calendario, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

export const CalendarComponent = ({ events, onSelectEvent, eventPropGetter }) => {
  return (
    <Calendario
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '60vh' }}
      onSelectEvent={onSelectEvent}
      eventPropGetter={eventPropGetter}
    />
  );
};
