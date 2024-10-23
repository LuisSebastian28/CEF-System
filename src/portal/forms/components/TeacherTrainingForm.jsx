import React from 'react';

export const TeacherTrainingForm = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">Teacher Training Classes</h3>
    <form className="grid grid-cols-3 gap-4">
      {/* Formulario de Teacher Training Classes */}
      <div className="col-span-1">
        <label htmlFor="month" className="block">For the month of</label>
        <input type="text" id="month" className="w-full p-2 border rounded" placeholder="Enter month" />
      </div>
      <div className="col-span-1">
        <label htmlFor="day" className="block">Day of the week</label>
        <input type="text" id="day" className="w-full p-2 border rounded" placeholder="Enter day of the week" />
      </div>
      <div className="col-span-1">
        <label htmlFor="time" className="block">Time</label>
        <input type="time" id="time" className="w-full p-2 border rounded" placeholder="Enter time" />
      </div>
      <div className="col-span-1">
        <label htmlFor="helper" className="block">Helper</label>
        <input type="text" id="helper" className="w-full p-2 border rounded" placeholder="Enter helper's name" />
      </div>
      <div className="col-span-1">
        <label htmlFor="phone" className="block">Phone</label>
        <input type="text" id="phone" className="w-full p-2 border rounded" placeholder="Enter phone number" />
      </div>
      <div className="col-span-1">
        <label htmlFor="offering" className="block">Offering</label>
        <input type="number" id="offering" className="w-full p-2 border rounded" placeholder="Enter offering" />
      </div>
      <div className="col-span-3">
        <label htmlFor="address" className="block">Address</label>
        <input type="text" id="address" className="w-full p-2 border rounded" placeholder="Enter address" />
      </div>
      <div className="col-span-1">
        <label htmlFor="zip" className="block">Zip</label>
        <input type="text" id="zip" className="w-full p-2 border rounded" placeholder="Enter zip code" />
      </div>
      <div className="col-span-3 text-right">
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">Submit</button>
      </div>
    </form>
  </div>
);
