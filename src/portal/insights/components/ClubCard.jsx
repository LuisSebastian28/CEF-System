import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startDeleteClub } from '../../../store/portal/clubs/clubsThunks';

const eventTypeMapping = {
  fivedayclub: '5-Day Club',
  goodnewsdaycamp: 'Good News Camp',
  teachertrainingclass: 'Teacher Training Classes',
  goodnewsclub: 'Good News Club',
  releasedtimes: 'Released Times',
};

export const ClubCard = ({ club, onViewDetails, onEditClub, onManageAttendees }) => {
  const dispatch = useDispatch();

  const handleDeleteClub = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(startDeleteClub(club.id));
        Swal.fire({
          title: 'Club Deleted!',
          text: 'The club has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'There was a problem deleting the club. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold mb-1">
          {eventTypeMapping[club.eventType] || club.eventType}
        </h3>
        <p className="text-gray-600"><strong>Date:</strong> {club.date}</p>
        <p className="text-gray-600"><strong>Time:</strong> {club.time}</p>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => onViewDetails(club)}>
          <i className="fas fa-eye"></i>
        </button>
        <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600" onClick={() => onEditClub(club)}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={() => onManageAttendees(club)}>
          <i className="fas fa-users"></i>
        </button>
        <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={handleDeleteClub}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
