import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingCallButton from '../components/FloatingCallButton';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-300">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <FloatingCallButton />
      <Footer />
    </div>
  );
};

export default MainLayout;
