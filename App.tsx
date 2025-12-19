import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import AboutPage from './components/AboutPage';
import AppointmentCalendar from './components/AppointmentCalendar';
import PerformanceDashboard from './components/PerformanceDashboard';
import MarketingCenter from './components/MarketingCenter';
import BookingFlow from './components/BookingFlow';
import ScrollToTop from './components/ScrollToTop';
import { MOCK_APPOINTMENTS } from './constants';
import { Appointment } from './types';

// Simple CRM Component
const CustomerList = () => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-gray-50 border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
          <th className="px-6 py-4 font-semibold text-gray-600">Email</th>
          <th className="px-6 py-4 font-semibold text-gray-600">Total Spent</th>
          <th className="px-6 py-4 font-semibold text-gray-600">Last Visit</th>
          <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'Jessica Alba', email: 'jess@example.com', spent: '$450', last: '2 days ago' },
          { name: 'Robert Downey', email: 'rdj@example.com', spent: '$1,200', last: '1 week ago' },
          { name: 'Emily Blunt', email: 'emily@example.com', spent: '$890', last: 'Yesterday' },
        ].map((c, i) => (
          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4 font-medium">{c.name}</td>
            <td className="px-6 py-4 text-gray-500">{c.email}</td>
            <td className="px-6 py-4 font-semibold text-[#2D2926]">{c.spent}</td>
            <td className="px-6 py-4 text-gray-400">{c.last}</td>
            <td className="px-6 py-4">
              <button className="text-[#C4A484] font-medium hover:underline">View History</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const App: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const userRole = 'OWNER'; // In a real app, this would be from auth state

  const handleUpdateAppointment = (updated: Appointment) => {
    setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleBookingComplete = (newAppt: Partial<Appointment>) => {
    // In a real app, send to backend
    console.log('Booking complete:', newAppt);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Public Booking Flow */}
        <Route path="/book" element={
          <div className="bg-[#FDFCFB] min-h-screen">
            <BookingFlow onComplete={handleBookingComplete} />
          </div>
        } />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={
          <Layout userRole={userRole}>
            <PerformanceDashboard />
          </Layout>
        } />

        {/* Calendar / Scheduling */}
        <Route path="/calendar" element={
          <Layout userRole={userRole}>
            <AppointmentCalendar 
              appointments={appointments} 
              onUpdateAppointment={handleUpdateAppointment} 
            />
          </Layout>
        } />

        {/* CRM */}
        <Route path="/customers" element={
          <Layout userRole={userRole}>
            <CustomerList />
          </Layout>
        } />

        {/* Marketing */}
        <Route path="/marketing" element={
          <Layout userRole={userRole}>
            <MarketingCenter />
          </Layout>
        } />

        {/* Performance Analytics */}
        <Route path="/performance" element={
          <Layout userRole={userRole}>
            <PerformanceDashboard />
          </Layout>
        } />

        {/* Catch-all to Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;