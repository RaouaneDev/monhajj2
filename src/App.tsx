import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Packages from './pages/Packages';
import GuideHajj from './pages/GuideHajj';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import GuideOmra from './pages/GuideOmra';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="packages" element={<Packages />} />
          <Route path="guide-hajj" element={<GuideHajj />} />
          <Route path="guide-omra" element={<GuideOmra />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking" element={<Booking />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
