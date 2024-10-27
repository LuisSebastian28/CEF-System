import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchClubs } from '../../../store/portal/clubs/clubsThunks';
import { ClubCard } from '../components/ClubCard';
import { ClubDetailsModal } from '../components/ClubDetailsModal';
import { ClubEditModal } from '../components/ClubEditModal';
import { AttendeesModal } from '../components/AttendeesModal';
import { ClubFilter } from '../components/ClubFilter';

const ITEMS_PER_PAGE = 6;

export const Insights = () => {
  const dispatch = useDispatch();
  const { clubs, status } = useSelector((state) => state.clubs);
  const [selectedType, setSelectedType] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all"); // Nuevo filtro de tiempo
  const [selectedClub, setSelectedClub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAttendeesModalOpen, setIsAttendeesModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(startFetchClubs());
  }, [dispatch]);

  const handleFilterChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleTimeFilterChange = (time) => {
    setTimeFilter(time);
    setCurrentPage(1);
  };

  const handleViewDetails = (club) => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };
  
  const handleEditClub = (club) => {
    setSelectedClub(club);
    setIsEditModalOpen(true);
  };
  
  const handleManageAttendees = (club) => {
    setSelectedClub(club);
    setIsAttendeesModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };
  
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClub(null);
  };
  
  const closeAttendeesModal = () => {
    setIsAttendeesModalOpen(false);
    setSelectedClub(null);
  };

  const isPastClub = (clubDate) => {
    const today = new Date();
    return new Date(clubDate) < today;
  };

  // Aplicamos filtro de tipo y tiempo
  const filteredClubs = clubs.filter((club) => {
    const matchesType = selectedType === "all" || club.eventType === selectedType;
    const matchesTime = 
      timeFilter === "all" ||
      (timeFilter === "upcoming" && !isPastClub(club.date)) ||
      (timeFilter === "past" && isPastClub(club.date));
    return matchesType && matchesTime;
  });

  const totalPages = Math.ceil(filteredClubs.length / ITEMS_PER_PAGE);
  const paginatedClubs = filteredClubs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col md:flex-row">
      <div className="w-full md:w-3/4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Insights</h1>

        {/* Guía de colores para los botones */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
            <span className="text-gray-600">Details</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
            <span className="text-gray-600">Edit</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            <span className="text-gray-600">Attendance</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span className="text-gray-600">Delete</span>
          </div>
        </div>

        {/* Contenedor desplazable para las tarjetas */}
        <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-4 border-t border-gray-200 pt-4">
          {status === 'loading' ? (
            <p className="text-center text-gray-600 italic">Loading clubs...</p>
          ) : (
            paginatedClubs.map((club) => (
              <ClubCard 
                key={club.id} 
                club={club} 
                onViewDetails={handleViewDetails} 
                onEditClub={handleEditClub} 
                onManageAttendees={handleManageAttendees}
              />
            ))
          )}
        </div>

        {/* Controles de paginación */}
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button 
            className={`px-4 py-2 rounded-lg shadow-sm text-white ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} 
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className={`px-4 py-2 rounded-lg shadow-sm text-white ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} 
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/4 mt-12 md:mt-0 md:ml-6 bg-white p-4 rounded-lg shadow-md">
        <ClubFilter selectedType={selectedType} onFilterChange={handleFilterChange} />
        
        {/* Filtro de tiempo */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Time Filter:</h3>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${timeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleTimeFilterChange("all")}
          >
            All
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${timeFilter === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleTimeFilterChange("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${timeFilter === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => handleTimeFilterChange("past")}
          >
            Past
          </button>
        </div>
      </div>

      <ClubDetailsModal club={selectedClub} isOpen={isModalOpen} onClose={closeDetailsModal} />
      <ClubEditModal club={selectedClub} isOpen={isEditModalOpen} onClose={closeEditModal} />
      <AttendeesModal club={selectedClub} isOpen={isAttendeesModalOpen} onClose={closeAttendeesModal} />
    </div>
  );
};
