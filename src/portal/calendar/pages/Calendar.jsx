'use client'

import { useState, useCallback, useMemo } from 'react'
import { Calendar as Calendario, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button, Input } from '@chakra-ui/react'
import {
  Modal as Dialog,
  ModalOverlay as DialogTrigger,
  ModalContent as DialogContent,
  ModalHeader as DialogHeader,
  ModalFooter as DialogFooter,
  ModalBody as DialogDescription,
  ModalCloseButton as DialogTitle,
} from '@chakra-ui/react'
import { FormLabel as Label } from '@chakra-ui/react'


// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

export const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Evento del sistema',
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 12, 0),
      userCreated: false
    },
    {
      id: 2,
      title: 'Mi evento',
      start: new Date(2023, 5, 16, 14, 0),
      end: new Date(2023, 5, 16, 16, 0),
      userCreated: true
    }
  ])

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    userCreated: true
  })

  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event)
  }, [])

  const handleAddEvent = useCallback(() => {
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }])
    setNewEvent({ title: '', start: new Date(), end: new Date(), userCreated: true })
    setIsAddEventOpen(false)
  }, [newEvent])

  const handleDeleteEvent = useCallback(() => {
    if (selectedEvent) {
      setEvents(prev => prev.filter(event => event.id !== selectedEvent.id))
      setSelectedEvent(null)
    }
  }, [selectedEvent])

  const eventStyleGetter = useCallback((event) => {
    const style = {
      backgroundColor: event.userCreated ? '#3182ce' : '#e53e3e',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return { style }
  }, [])

  const { components, defaultDate } = useMemo(() => ({
    components: {
      event: ({ event }) => (
        <span>{event.title}</span>
      ),
    },
    defaultDate: new Date(),
  }), [])

  return (
    <div className="h-screen flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Calendario de Eventos</h1>
      <div className="flex justify-between mb-4">
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Agregar Evento</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Evento</DialogTitle>
              <DialogDescription>
                Ingrese los detalles del nuevo evento aquí.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start" className="text-right">
                  Inicio
                </Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end" className="text-right">
                  Fin
                </Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddEvent}>Agregar Evento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {selectedEvent && (
          <Button variant="destructive" onClick={handleDeleteEvent}>Eliminar Evento Seleccionado</Button>
        )}
      </div>
      <Calendario
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)' }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        components={components}
        defaultDate={defaultDate}
      />
    </div>
  )
}
