import React, { useState, useEffect } from 'react';

export const EditClubModal = ({ isOpen, onClose, club, onSave }) => {
  const [formData, setFormData] = useState({
    club: '',
    date: '',
    time: '',
    hostess: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    helper: '',
    missionary: '',
    offering: '',
    comments: '',
    eventType: '',
  });

  useEffect(() => {
    if (club) {
      // Prellenar el formulario con los datos actuales del club
      setFormData({
        club: club.club || '',
        date: club.date || '',
        time: club.time || '',
        hostess: club.hostess || '',
        phone: club.phone || '',
        address: club.address || '',
        city: club.city || '',
        state: club.state || '',
        helper: club.helper || '',
        missionary: club.missionary || '',
        offering: club.offering || '',
        comments: club.comments || '',
        eventType: club.eventType || '',
      });
    }
  }, [club]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Llamar a la función de guardar con los datos actualizados
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Club</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="club">Club</label>
              <input
                type="text"
                id="club"
                className="w-full p-2 border rounded"
                value={formData.club}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="w-full p-2 border rounded"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                className="w-full p-2 border rounded"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="hostess">Hostess</label>
              <input
                type="text"
                id="hostess"
                className="w-full p-2 border rounded"
                value={formData.hostess}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className="w-full p-2 border rounded"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                className="w-full p-2 border rounded"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="helper">Helper</label>
              <input
                type="text"
                id="helper"
                className="w-full p-2 border rounded"
                value={formData.helper}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="offering">Offering</label>
              <input
                type="text"
                id="offering"
                className="w-full p-2 border rounded"
                value={formData.offering}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="comments">Comments</label>
              <input
                type="text"
                id="comments"
                className="w-full p-2 border rounded"
                value={formData.comments}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded ml-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
