import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Packages from './pages/Packages';
import GuideHajj from './pages/GuideHajj';
import GuideOmra from './pages/GuideOmra';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/guide-hajj" element={<GuideHajj />} />
        <Route path="/guide-omra" element={<GuideOmra />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
