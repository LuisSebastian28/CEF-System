import React from 'react';


export const Calendar = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-4/5 p-10">
        <h1 className="text-4xl font-bold mb-10">Calendar</h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <p className="text-gray-600">View and manage your upcoming events and activities.</p>
            <ul className="mt-5 space-y-2">
              <li>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Parent-Teacher Conference</h3>
                    <p className="text-gray-600">May 15, 2023 - 6:00 PM</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Field Trip to Science Museum</h3>
                    <p className="text-gray-600">June 10, 2023 - 9:00 AM</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Bake Sale Fundraiser</h3>
                    <p className="text-gray-600">July 1, 2023 - 11:00 AM</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Google Calendar</h2>
            <p className="text-gray-600">View and manage your events from your Google Calendar.</p>
            <ul className="mt-5 space-y-2">
              <li>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Dentist Appointment</h3>
                    <p className="text-gray-600">April 20, 2023 - 2:00 PM</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Yoga Class</h3>
                    <p className="text-gray-600">May 5, 2023 - 6:30 PM</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Birthday Party</h3>
                    <p className="text-gray-600">June 15, 2023 - 3:00 PM</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Add Event</h2>
            <p className="text-gray-600">Create a new event or activity for your calendar.</p>
            <form className="mt-5 space-y-4">
              <div>
                <label className="block text-gray-700">Event Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter event name" />
              </div>
              <div>
                <label className="block text-gray-700">Event Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700">Event Time</label>
                <div className="flex space-x-2">
                  <input type="time" className="w-full px-3 py-2 border rounded" placeholder="Start" />
                  <input type="time" className="w-full px-3 py-2 border rounded" placeholder="End" />
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white px-3 py-2 rounded">Add Event</button>
            </form>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Calendar View</h2>
            <p className="text-gray-600">View your events and activities in a calendar format.</p>
            <div className="mt-5">
              <div className="calendar">
                <div className="calendar-header flex justify-between items-center mb-2">
                  <button>&lt;</button>
                  <span>April 2024</span>
                  <button>&gt;</button>
                </div>
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th>Su</th>
                      <th>Mo</th>
                      <th>Tu</th>
                      <th>We</th>
                      <th>Th</th>
                      <th>Fr</th>
                      <th>Sa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-gray-400">31</td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>8</td>
                      <td>9</td>
                      <td>10</td>
                      <td>11</td>
                      <td>12</td>
                      <td>13</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>15</td>
                      <td>16</td>
                      <td>17</td>
                      <td>18</td>
                      <td>19</td>
                      <td>20</td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>22</td>
                      <td>23</td>
                      <td>24</td>
                      <td>25</td>
                      <td>26</td>
                      <td>27</td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>29</td>
                      <td>30</td>
                      <td className="text-gray-400">1</td>
                      <td className="text-gray-400">2</td>
                      <td className="text-gray-400">3</td>
                      <td className="text-gray-400">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

