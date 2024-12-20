import React, { useEffect, useState } from 'react';
import { formFields } from '../../../portal/forms/helpers/formConfigs';
import { getUserFromId } from '../../../firebase/provs/userProviders';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startUpdateClub } from '../../../store/portal/clubs/clubsThunks';

export const ClubEditModal = ({ club, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [missionaryData, setMissionaryData] = useState(null);

  const eventTypeMapping = {
    fivedayclub: '5-Day Club',
    goodnewsdaycamp: 'Good News Camp',
    teachertrainingclass: 'Teacher Training Classes',
    goodnewsclub: 'Good News Club',
    releasedtimes: 'Released Times',
  };

  const configKey = eventTypeMapping[club?.eventType];
  const config = formFields[configKey];

  useEffect(() => {
    if (isOpen) {
      setFormData((prevData) => ({
        ...prevData,
        ...club,
        date: club.date ? new Date(club.date).toISOString().split('T')[0] : '',
        time: club.time || '', // Mantén la hora como está si ya es 'HH:mm'
      }));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, club]);



  useEffect(() => {
    const fetchMissionary = async () => {
      if (club?.missionary && typeof club.missionary === 'string') {
        const result = await getUserFromId(club.missionary);
        if (result.ok) {
          setMissionaryData(result.user);
        } else {
          setMissionaryData({ error: 'Missionary data not available' });
        }
      } else {
        setMissionaryData(null);
      }
    };
    fetchMissionary();
  }, [club]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'date' || name === 'time' ? value : value,
    }));
  };



  const handleSaveChanges = async () => {
    try {
      const formattedData = {
        ...formData,
        date: formData.date, // Ya en 'YYYY-MM-DD'
        time: formData.time, // Ya en 'HH:mm'
      };
  
      await dispatch(startUpdateClub(club.id, formattedData));
      Swal.fire({
        title: 'Club Updated!',
        text: 'The changes have been saved successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onClose();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'There was a problem updating the club. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };
  

  if (!isOpen || !club) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Edit {club.name || configKey}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {config.fields
            .filter((field) => field !== 'id' && field !== 'attendance' && field !== 'missionary')
            .map((field) => (
              <div key={field} className="border-b pb-2">
                <label className="block font-semibold capitalize">{field}:</label>
                {field === 'date' ? (
                  <input
                    type="date"
                    name={field}
                    value={formData[field] ? new Date(formData[field]).toISOString().split('T')[0] : ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : field === 'time' ? (
                  <input
                    type="time"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                )}

              </div>
            ))}


          {missionaryData && (
            <div className="col-span-2 border-t pt-4">
              <label className="block font-semibold">Missionary:</label>
              {missionaryData.error ? (
                <p className="text-red-500">{missionaryData.error}</p>
              ) : (
                <div className="flex items-center gap-4 mt-2">
                  {missionaryData.photoUrl && (
                    <img
                      src={missionaryData.photoUrl}
                      alt="Missionary"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p>{`${missionaryData.firstName} ${missionaryData.lastName}`}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
