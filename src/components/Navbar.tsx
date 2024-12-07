import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">RAOUANE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              Accueil
            </Link>
            <Link
              to="/packages"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              Nos Forfaits
            </Link>
            {/* Menu déroulant pour les guides */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary flex items-center">
                Guides
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link to="/guide-hajj" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">Guide du Hajj</Link>
                <Link to="/guide-omra" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">Guide de l'Omra</Link>
              </div>
            </div>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              À Propos
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              to="/booking"
              className="btn-primary"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/packages"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Nos Forfaits
              </Link>
              <Link
                to="/guide-hajj"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Guide du Hajj
              </Link>
              <Link
                to="/guide-omra"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Guide de l'Omra
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                À Propos
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/booking"
                className="block px-3 py-2 text-center btn-primary"
                onClick={() => setIsOpen(false)}
              >
                Réserver
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
