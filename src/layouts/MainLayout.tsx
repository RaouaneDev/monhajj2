import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingCallButton from '../components/FloatingCallButton';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingCallButton />
      <Footer />
    </div>
  );
};

export default MainLayout;
