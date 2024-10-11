import React from 'react';

export const Insights = () => {
  return (
    <div className="p-8 white min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Insights</h2>

      {/* Filtros de Categoría y Búsqueda */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-black text-white rounded">All</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded">5-Day Clubs</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded">Good News Camps</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded">Teacher Training Classes</button>
        </div>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Search events..."
            className="p-2 border rounded w-64"
          />
          <select className="p-2 border rounded">
            <option>All Locations</option>
            <option>New York, NY</option>
            <option>Los Angeles, CA</option>
            <option>Chicago, IL</option>
            <option>Miami, FL</option>
            <option>Seattle, WA</option>
            <option>Boston, MA</option>
          </select>
        </div>
      </div>

      {/* Tabla de Eventos */}
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="text-left p-4">Date</th>
            <th className="text-left p-4">Host</th>
            <th className="text-left p-4">Type</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Attendees</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-4">2023-06-15</td>
            <td className="p-4">John Doe</td>
            <td className="p-4">5-Day Club</td>
            <td className="p-4">New York, NY</td>
            <td className="p-4">25</td>
            <td className="p-4">
              <button className="px-3 py-1 bg-gray-200 rounded mr-2">View Attendees</button>
              <button className="px-3 py-1 bg-gray-200 rounded">Edit</button>
            </td>
          </tr>
          <tr className="border-t">
            <td className="p-4">2023-07-01</td>
            <td className="p-4">Jane Smith</td>
            <td className="p-4">Good News Camp</td>
            <td className="p-4">Los Angeles, CA</td>
            <td className="p-4">35</td>
            <td className="p-4">
              <button className="px-3 py-1 bg-gray-200 rounded mr-2">View Attendees</button>
              <button className="px-3 py-1 bg-gray-200 rounded">Edit</button>
            </td>
          </tr>
          <tr className="border-t">
            <td className="p-4">2023-08-10</td>
            <td className="p-4">Michael Johnson</td>
            <td className="p-4">Teacher Training Class</td>
            <td className="p-4">Chicago, IL</td>
            <td className="p-4">18</td>
            <td className="p-4">
              <button className="px-3 py-1 bg-gray-200 rounded mr-2">View Attendees</button>
              <button className="px-3 py-1 bg-gray-200 rounded">Edit</button>
            </td>
          </tr>
          {/* Añade más filas según sea necesario */}
        </tbody>
      </table>
    </div>
  );
};
