// src/portal/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchDashboardData } from '../../../store/portal/dashboard/dashboardThunks';
import { BarChartSection } from '../components/BarChartSection';

// Importa el componente `StatCard` correctamente si está en components
import { StatCard } from '../components/StatCard';

// Importa todos los componentes de `recharts`
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    clubComparisonData,
    totalAttendees,
    currentYearClubsByMonth,
    previousYearClubsByMonth,
    currentYearAttendeesByMonth,
    previousYearAttendeesByMonth,
    status,
    error
  } = useSelector(state => state.dashboard);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(startFetchDashboardData());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div className="flex items-center justify-center h-screen bg-gray-50">
    <p className="text-2xl font-semibold text-gray-500">Loading ...</p>
  </div>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen bg-white">
      <div className="w-full p-10">
        <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

        {/* Total Attendees Card */}
        <StatCard
          title="Total Attendees"
          value={totalAttendees}
          description="Total attendees from all clubs (current and previous year)."
        />

        {/* Club Comparison Chart */}
        <div className="bg-white p-5 rounded shadow mt-10">
          <h2 className="text-xl font-bold mb-5">Club Comparison (This Year vs Last Year)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clubComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clubs" fill="#8884d8" name="Number of Clubs" />
              <Bar dataKey="attendees" fill="#82ca9d" name="Total Attendees" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Clubs by Month Charts for 2023 and 2024 */}
        <div className="bg-white p-5 rounded shadow mt-10">
          <h2 className="text-xl font-bold mb-5">Clubs by Month (2023 & 2024)</h2>
          <div className="grid grid-cols-2 gap-5">
            <BarChartSection
              title="Clubs by Month (2023)"
              data={previousYearClubsByMonth}
              dataKey="clubs"
              barColor="#FFBB28"
              name="2023 Clubs"
            />
            <BarChartSection
              title="Clubs by Month (2024)"
              data={currentYearClubsByMonth}
              dataKey="clubs"
              barColor="#0088FE"
              name="2024 Clubs"
            />
          </div>
        </div>

        {/* Attendees by Month Charts for 2023 and 2024 */}
        <div className="bg-white p-5 rounded shadow mt-10">
          <h2 className="text-xl font-bold mb-5">Attendees by Month (2023 & 2024)</h2>
          <div className="grid grid-cols-2 gap-5">
            <BarChartSection
              title="Attendees by Month (2023)"
              data={previousYearAttendeesByMonth}
              dataKey="attendees"
              barColor="#FFBB28"
              name="2023 Attendees"
            />
            <BarChartSection
              title="Attendees by Month (2024)"
              data={currentYearAttendeesByMonth}
              dataKey="attendees"
              barColor="#0088FE"
              name="2024 Attendees"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
