import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Calendar as Calendario, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { startAddingNewEvent } from '../../../store/portal/calendar/calendarThunks';  // Importar thunk para añadir eventos

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

export const Calendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.events);  // Obtener eventos del estado global

  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date() })
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)  // Estado para controlar el modal

  const handleAddEvent = () => {
    // Despachar el thunk para añadir un nuevo evento a Firebase
    dispatch(startAddingNewEvent(newEvent));

    // Resetear el estado local y cerrar el modal
    setNewEvent({ title: '', start: new Date(), end: new Date() });
    setIsAddEventOpen(false);
  }

  const { components, defaultDate } = useMemo(() => ({
    components: {
      event: ({ event }) => (
        <span>{event.title}</span>
      ),
    },
    defaultDate: new Date(),
  }), [])

  return (
    <div className="flex flex-row h-screen">
      
      {/* Calendario principal */}
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">Calendar</h1>

        {/* Botón flotante para abrir el modal de agregar evento */}
        <button
          onClick={() => setIsAddEventOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          style={{ zIndex: 50 }}  // Asegura que el botón esté encima de otros elementos
        >
          Add Event
        </button>

        {/* Modal de agregar evento */}
        {isAddEventOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: 50 }}  // Asegura que el modal tenga un z-index alto
          >
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full" style={{ zIndex: 100 }}>
              <h2 className="text-xl font-bold mb-4">Agregar Nuevo Evento</h2>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Título</label>
                <input
                  id="title"
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="start" className="block text-gray-700">Inicio</label>
                <input
                  id="start"
                  type="datetime-local"
                  value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="end" className="block text-gray-700">Fin</label>
                <input
                  id="end"
                  type="datetime-local"
                  value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddEvent}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Agregar Evento
                </button>
                <button
                  onClick={() => setIsAddEventOpen(false)}
                  className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calendario */}
        <Calendario
          localizer={localizer}
          events={events}  // Lista de eventos desde Redux
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 200px)', zIndex: 1 }}  // Da un z-index menor al calendario
          components={components}
          defaultDate={defaultDate}
          selectable={false}  // No permite seleccionar intervalos en el calendario
        />
      </div>
      {/* Sidebar con Eventos de Hoy */}
      <div className="w-1/4 p-4 bg-gray-100 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Today's Events</h2>
        <ul>
          {events.length === 0 ? (
            <li className="text-gray-500">No events today</li>
          ) : (
            events.map(event => (
              <li key={event.id} className="mb-4">
                <span className="block font-semibold">{event.title}</span>
                <span className="text-gray-600">
                  {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

    </div>
  )
}
