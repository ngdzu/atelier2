import React, { useState, useEffect } from 'react';
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
import SnowEffect from './components/SnowEffect';
import { dataService } from './services/dataService';
import { Appointment, Customer } from './types';
import { ENABLE_SNOW_EFFECT, SNOW_INTENSITY } from './constants';

// Simple CRM Component refactored to use service
const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getCustomers().then(data => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Loading Registry...</div>;

  return (
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
          {customers.map((c, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-medium">{c.name}</td>
              <td className="px-6 py-4 text-gray-500">{c.email}</td>
              <td className="px-6 py-4 font-semibold text-[#2D2926]">${c.totalSpent}</td>
              <td className="px-6 py-4 text-gray-400">{c.lastVisit || 'Never'}</td>
              <td className="px-6 py-4">
                <button className="text-[#C4A484] font-medium hover:underline">View History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const userRole = 'OWNER'; 

  useEffect(() => {
    dataService.getAppointments().then(setAppointments);
  }, []);

  const handleUpdateAppointment = (updated: Appointment) => {
    setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleBookingComplete = async (newAppt: Partial<Appointment>) => {
    const saved = await dataService.addAppointment(newAppt);
    setAppointments(prev => [...prev, saved]);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <SnowEffect enabled={ENABLE_SNOW_EFFECT} intensity={SNOW_INTENSITY} />
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