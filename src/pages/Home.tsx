import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FlipCard from '../components/FlipCard';
import BookingQRCode from '../components/BookingQRCode';

const Home: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Gérer l'affichage du bouton de retour en haut
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2018/10/30/03/05/islam-3782623_1280.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative container-custom h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Votre Voyage Spirituel Commence Ici
            </h1>
            <p className="text-xl mb-8">
              Découvrez nos forfaits Hajj et Omra personnalisés pour une expérience inoubliable
            </p>
            <Link to="/packages" className="btn-primary text-lg">
              Explorer Nos Forfaits
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Nous Choisir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Expérience</h3>
              <p className="text-gray-600">
                Plus de 15 ans d'expertise dans l'organisation de voyages spirituels
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
              <p className="text-gray-600">
                Hébergement de luxe et services haut de gamme garantis
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Accompagnement</h3>
              <p className="text-gray-600">
                Support 24/7 et guides expérimentés à votre service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Nos Forfaits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FlipCard 
              frontImage="https://cdn.pixabay.com/photo/2018/04/19/05/47/kaaba-3332379_1280.jpg"
              frontTitle="Omra Ramadan"
              frontDescription="15 jours incluant les derniers jours du Ramadan"
              backTitle="Détails du forfait Omra Ramadan"
              backDescription="✓ Vols directs inclus
✓ Hôtels 5* à proximité des lieux saints
✓ Pension complète
✓ Guide francophone dédié
✓ Visites des lieux historiques
✓ Transport sur place"
              price="2500€"
            />

            <FlipCard 
              frontImage="https://cdn.pixabay.com/photo/2020/04/14/10/15/mosque-5041799_1280.jpg"
              frontTitle="Hajj Confort"
              frontDescription="Programme complet de 3 semaines tout inclus"
              backTitle="Détails du forfait Hajj Confort"
              backDescription="✓ Vols directs inclus
✓ Hôtels 5* à La Mecque et Médine
✓ Tentes climatisées à Mina
✓ Pension complète
✓ Guide expert pour les rituels
✓ Transport VIP sur place"
              price="6500€"
            />

            <FlipCard 
              frontImage="https://cdn.pixabay.com/photo/2018/02/24/16/35/hajj-3178821_1280.jpg"
              frontTitle="Omra Express"
              frontDescription="Programme court de 10 jours"
              backTitle="Détails du forfait Omra Express"
              backDescription="✓ Vols directs inclus
✓ Hôtels 4* à proximité
✓ Demi-pension
✓ Guide francophone
✓ Transferts aéroport
✓ Assistance 24/7"
              price="1900€"
            />
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/packages" 
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition duration-300"
            >
              Voir tous nos forfaits
            </Link>
          </div>
        </div>
      </section>

      {/* Section QR Code */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <BookingQRCode />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Commencer Votre Voyage ?</h2>
          <p className="text-xl mb-8">Réservez maintenant pour vivre une expérience spirituelle unique</p>
          <Link to="/booking" className="btn-white">
            Réserver Maintenant
          </Link>
        </div>
      </section>

      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 bg-blue-600 text-white p-2 rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300 z-50 flex items-center justify-center w-8 h-8 border border-white"
          aria-label="Retour en haut"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home;
