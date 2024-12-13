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
import PaymentSuccess from './pages/PaymentSuccess';
import RegistrationSuccess from './pages/RegistrationSuccess';
import Payment from './pages/Payment';

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
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
