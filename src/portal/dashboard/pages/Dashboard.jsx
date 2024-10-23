import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchDashboardData } from '../../../store/portal/dashboard/dashboardThunks';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { students, registrations, campaigns, userStatus, status, error } = useSelector(state => state.dashboard);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(startFetchDashboardData());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  // Asegurarse de que los datos están definidos antes de acceder a ellos
  const totalStudents = students ? students.reduce((acc, cur) => acc + cur.students, 0) : 0;
  const totalRegistrations = registrations ? registrations.reduce((acc, cur) => acc + cur.registrations, 0) : 0;
  const totalCampaigns = campaigns ? campaigns.length : 0;
  const userStatusData = userStatus || [];

  return (
    <div className="flex h-screen bg-white">
      <div className="w-4/5 p-10">
        <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Total Students</h2>
            <p className="text-gray-600">The total number of students enrolled in our programs.</p>
            <div className="flex items-center mt-5">
              <span className="text-4xl font-bold">{totalStudents}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <div className="flex items-center mt-5">
              <span className="text-4xl font-bold">{totalRegistrations}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold">New Registrations</h2>
            <div className="flex items-center mt-5">
              <span className="text-4xl font-bold">{totalRegistrations}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold mb-5">Student Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={students || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-bold mb-5">Campaign Participation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaigns || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="participants" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded shadow mt-10">
          <h2 className="text-xl font-bold mb-5">User Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {userStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
