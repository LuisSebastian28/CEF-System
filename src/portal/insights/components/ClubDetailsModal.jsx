import React, { useEffect, useState } from 'react';
import { formFields } from '../../../portal/forms/helpers/formConfigs';
import { getUserFromReference } from '../../../firebase/provs/userProviders';

export const ClubDetailsModal = ({ club, isOpen, onClose }) => {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchMissionary = async () => {
      if (club?.missionary && typeof club.missionary === 'object') {
        const result = await getUserFromReference(club.missionary);
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

  if (!isOpen || !club) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Details for {club.name || configKey}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {config ? (
            config.fields
              .filter((field) => field !== 'id' && field !== 'attendance' && field !== 'missionary')
              .map((field) => (
                <div key={field} className="border-b pb-2">
                  <span className="block font-semibold capitalize">{field}:</span>
                  <span className="block text-gray-700">{club[field] || 'N/A'}</span>
                </div>
              ))
          ) : (
            <p className="col-span-2">Configuration for this club type is not available.</p>
          )}

          {missionaryData && (
            <div className="col-span-2 border-t pt-4">
              <span className="block font-semibold">Missionary:</span>
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

        <div className="text-right mt-6">
          <button
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
