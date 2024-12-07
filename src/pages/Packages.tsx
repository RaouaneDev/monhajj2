import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlipCard from '../components/FlipCard';

const Packages: React.FC = () => {
  const navigate = useNavigate();

  const packages = [
    {
      frontImage: "https://picsum.photos/800/600?random=1",
      frontTitle: "Omra Janvier 2025",
      frontDescription: "Départ le 10 Janvier 2025",
      backTitle: "Forfait Janvier 2025",
      backDescription: "• Vol direct Paris-Djeddah\n• Hébergement 5 étoiles\n• Transport sur place\n• Guide spirituel\n• Pension complète\n• 15 jours sur place",
      price: "2500€"
    },
    {
      frontImage: "https://picsum.photos/800/600?random=2",
      frontTitle: "Omra Février 2025",
      frontDescription: "Départ le 15 Février 2025",
      backTitle: "Forfait Février 2025",
      backDescription: "• Vol direct Paris-Djeddah\n• Hébergement 5 étoiles VIP\n• Transport premium\n• Guide personnel\n• Pension complète\n• 12 jours sur place",
      price: "2700€"
    },
    {
      frontImage: "https://picsum.photos/800/600?random=3",
      frontTitle: "Omra Mars 2025",
      frontDescription: "Départ le 5 Mars 2025",
      backTitle: "Forfait Mars 2025",
      backDescription: "• Vol avec escale\n• Hébergement 4 étoiles\n• Transport inclus\n• Guide francophone\n• Demi-pension\n• 10 jours sur place",
      price: "2300€"
    }
  ];

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">Nos Forfaits Omra 2025</h1>
          <p className="text-xl text-yellow-300">Réservez dès maintenant votre voyage spirituel pour début 2025</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="relative">
              <FlipCard {...pkg} />
              <button
                onClick={() => navigate('/booking')}
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
