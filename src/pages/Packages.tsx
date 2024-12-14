import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlipCard from '../components/FlipCard';
import { scrollToTop } from '../utils/scrollUtils';

const Packages: React.FC = () => {
  const navigate = useNavigate();

  const packages = [
    // Hajj Packages
    {
      frontTitle: "Hajj 2025 Standard",
      frontDescription: "Départ Juin 2025",
      backTitle: "Forfait Hajj Standard",
      backDescription: "✓ Vol aller-retour\n✓ Hébergement\n✓ Transport sur place\n✓ Accompagnement spirituel",
      price: "6500€",
      badge: "Places limitées"
    },
    {
      frontTitle: "Hajj 2025 Confort",
      frontDescription: "Départ Juin 2025",
      backTitle: "Forfait Hajj Confort (+30%)",
      backDescription: "✓ Tous les avantages Standard\n✓ Hôtels premium\n✓ Repas inclus\n✓ Service conciergerie",
      price: "8450€",
      badge: "⭐"
    },
    {
      frontTitle: "Hajj 2025 Premium",
      frontDescription: "Départ Juin 2025",
      backTitle: "Forfait Hajj Premium (+50%)",
      backDescription: "✓ Tous les avantages Confort\n✓ Hôtels 5 étoiles\n✓ Service VIP\n✓ Guide personnel",
      price: "9750€",
      badge: "👑"
    },

    // Omra Janvier
    {
      frontTitle: "Omra Janvier Standard",
      frontDescription: "Départ Janvier 2025",
      backTitle: "Forfait Omra Standard",
      backDescription: "✓ Vol aller-retour\n✓ Hébergement\n✓ Transport sur place\n✓ Accompagnement spirituel",
      price: "1500€"
    },
    {
      frontTitle: "Omra Janvier Confort",
      frontDescription: "Départ Janvier 2025",
      backTitle: "Forfait Omra Confort",
      backDescription: "✓ Tous les avantages Standard\n✓ Hôtels premium\n✓ Repas inclus\n✓ Service conciergerie",
      price: "2000€",
      badge: "⭐"
    },
    {
      frontTitle: "Omra Janvier Premium",
      frontDescription: "Départ Janvier 2025",
      backTitle: "Forfait Omra Premium",
      backDescription: "✓ Tous les avantages Confort\n✓ Hôtels 5 étoiles\n✓ Service VIP\n✓ Guide personnel",
      price: "2500€",
      badge: "👑"
    },

    // Ajout des forfaits Omra Février
    {
      frontTitle: "Omra Février Standard",
      frontDescription: "Départ Février 2025",
      backTitle: "Forfait Omra Standard",
      backDescription: "✓ Vol aller-retour\n✓ Hébergement\n✓ Transport sur place\n✓ Accompagnement spirituel",
      price: "1500€"
    },
    {
      frontTitle: "Omra Février Confort",
      frontDescription: "Départ Février 2025",
      backTitle: "Forfait Omra Confort",
      backDescription: "✓ Tous les avantages Standard\n✓ Hôtels premium\n✓ Repas inclus\n✓ Service conciergerie",
      price: "2000€",
      badge: "⭐"
    },
    {
      frontTitle: "Omra Février Premium",
      frontDescription: "Départ Février 2025",
      backTitle: "Forfait Omra Premium",
      backDescription: "✓ Tous les avantages Confort\n✓ Hôtels 5 étoiles\n✓ Service VIP\n✓ Guide personnel",
      price: "2500€",
      badge: "👑"
    },

    // Omra Ramadhan (Mars)
    {
      frontTitle: "Omra Ramadhan Standard",
      frontDescription: "Départ Mars 2025",
      backTitle: "Forfait Omra Ramadhan Standard",
      backDescription: "✓ Vol aller-retour\n✓ Hébergement\n✓ Transport sur place\n✓ Accompagnement spirituel",
      price: "1500€",
      badge: "RAMADHAN"
    },
    {
      frontTitle: "Omra Ramadhan Confort",
      frontDescription: "Départ Mars 2025",
      backTitle: "Forfait Omra Ramadhan Confort",
      backDescription: "✓ Tous les avantages Standard\n✓ Hôtels premium\n✓ Repas inclus\n✓ Service conciergerie",
      price: "2000€",
      badge: "RAMADHAN ⭐"
    },
    {
      frontTitle: "Omra Ramadhan Premium",
      frontDescription: "Départ Mars 2025",
      backTitle: "Forfait Omra Ramadhan Premium",
      backDescription: "✓ Tous les avantages Confort\n✓ Hôtels 5 étoiles\n✓ Service VIP\n✓ Guide personnel",
      price: "2500€",
      badge: "RAMADHAN 👑"
    }
  ];

  const handleBookingClick = () => {
    scrollToTop();
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Hajj */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">Hajj 2025</h1>
          <p className="text-xl text-yellow-300">Réservez dès maintenant votre pèlerinage</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {packages.slice(0, 3).map((pkg, index) => (
            <div key={index} className="relative">
              <FlipCard {...pkg} />
              <button
                onClick={handleBookingClick}
                className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 z-10"
              >
                Réserver
              </button>
            </div>
          ))}
        </div>

        {/* Section Omra */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">Omra 2025</h1>
          <p className="text-xl text-yellow-300">Choisissez votre forfait Omra</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {packages.slice(3, 9).map((pkg, index) => (
            <div key={index} className="relative">
              <FlipCard {...pkg} />
              <button
                onClick={handleBookingClick}
                className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 z-10"
              >
                Réserver
              </button>
            </div>
          ))}
        </div>

        {/* Section Omra Ramadhan */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">Omra Ramadhan 2025</h1>
          <p className="text-xl text-yellow-300">Forfaits spéciaux pour le mois sacré</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.slice(9).map((pkg, index) => (
            <div key={index} className="relative">
              <FlipCard {...pkg} />
              <button
                onClick={handleBookingClick}
                className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 z-10"
              >
                Réserver
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
