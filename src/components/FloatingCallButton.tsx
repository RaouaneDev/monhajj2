import React, { useState } from 'react';
import { FaPhone, FaWhatsapp, FaTimes } from 'react-icons/fa';

const FloatingCallButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = '+33783647594';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '')}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded ? (
        <div className="flex flex-col gap-4">
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 border-2 border-black"
            aria-label="Ouvrir WhatsApp"
          >
            <FaWhatsapp className="text-2xl" />
          </button>
          
          <button
            onClick={handlePhoneClick}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 border-2 border-black"
            aria-label="Appeler"
          >
            <FaPhone className="text-2xl" />
          </button>

          <button
            onClick={() => setIsExpanded(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
            aria-label="Fermer le menu d'appel"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-primary hover:bg-primary-dark text-dark-100 rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 border-2 border-black"
          aria-label="Ouvrir le menu d'appel"
        >
          <FaPhone className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default FloatingCallButton;
