import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startCreateClub } from '../../../store/portal/clubs/clubsThunks';
import { doc } from 'firebase/firestore';
import { FirebaseDB } from '../../../firebase/firebaseConfig';

export const TeacherTrainingForm = () => {
  const dispatch = useDispatch();

  // Estado para almacenar el formulario y los errores
  const [formData, setFormData] = useState({
    county: '',
    date: '',
    time: '',
    location: '', // Nuevo campo de ubicación
    eventType: 'teachertrainingclass',
  });

  const [errors, setErrors] = useState({});

  // Manejar el cambio de los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Validación de campos requeridos
  const validateForm = () => {
    const newErrors = {};

    if (!formData.county) newErrors.county = 'County is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formWithReference = {
        ...formData,
      };

      dispatch(startCreateClub(formWithReference));
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Teacher Training Classes</h3>
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
        {/* Campo County */}
        <div className="col-span-1">
          <label htmlFor="county" className="block">County</label>
          <input
            type="text"
            id="county"
            className={`w-full p-2 border rounded ${errors.county ? 'border-red-500' : ''}`}
            placeholder="Enter county"
            value={formData.county}
            onChange={handleChange}
          />
          {errors.county && <p className="text-red-500">{errors.county}</p>}
        </div>

        {/* Campo Date */}
        <div className="col-span-1">
          <label htmlFor="date" className="block">Date</label>
          <input
            type="date"
            id="date"
            className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : ''}`}
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        {/* Campo Time */}
        <div className="col-span-1">
          <label htmlFor="time" className="block">Time</label>
          <input
            type="time"
            id="time"
            className={`w-full p-2 border rounded ${errors.time ? 'border-red-500' : ''}`}
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <p className="text-red-500">{errors.time}</p>}
        </div>

        {/* Campo Location */}
        <div className="col-span-1">
          <label htmlFor="location" className="block">Location</label>
          <input
            type="text"
            id="location"
            className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : ''}`}
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>

        <div className="col-span-3 text-right">
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};
