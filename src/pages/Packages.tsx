import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PackageCardProps {
  title: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
  tag?: string;
  date?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ title, price, duration, image, features, tag, date }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      {tag && (
        <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {tag}
        </span>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl font-bold text-blue-600">{price}</span>
        <span className="text-gray-600">{duration}</span>
      </div>
      {date && (
        <div className="mb-4 bg-blue-50 p-2 rounded-lg">
          <span className="text-blue-800 font-semibold">Date de départ : {date}</span>
        </div>
      )}
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to="/booking"
        className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Réserver maintenant
      </Link>
    </div>
  </div>
);

const Packages: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const omraPackages = [
    {
      title: 'Omra Janvier',
      price: '2 900 €',
      duration: '12 jours',
      date: '5 Janvier 2024',
      image: 'https://cdn.pixabay.com/photo/2018/04/19/05/47/kaaba-3332379_1280.jpg',
      features: [
        'Vol direct Paris-Djeddah',
        'Hôtel 5* à La Mecque et Médine',
        'Pension complète',
        'Guide francophone',
        'Transferts privés',
        'Visa Omra inclus'
      ]
    },
    {
      title: 'Omra Février',
      price: '2 900 €',
      duration: '12 jours',
      date: '2 Février 2024',
      image: 'https://cdn.pixabay.com/photo/2020/04/14/10/15/mosque-5041799_1280.jpg',
      features: [
        'Vol direct Paris-Djeddah',
        'Hôtel 5* à La Mecque et Médine',
        'Pension complète',
        'Guide francophone',
        'Transferts privés',
        'Visa Omra inclus'
      ]
    },
    {
      title: 'Omra Mars',
      price: '3 200 €',
      duration: '12 jours',
      date: '1 Mars 2024',
      image: 'https://cdn.pixabay.com/photo/2016/11/14/03/35/mosque-1822134_1280.jpg',
      features: [
        'Vol direct Paris-Djeddah',
        'Hôtel 5* à La Mecque et Médine',
        'Pension complète',
        'Guide francophone',
        'Transferts privés',
        'Visa Omra inclus'
      ]
    },
    {
      title: 'Omra Ramadan',
      price: '3 900 €',
      duration: '15 jours',
      date: '10 Mars 2024',
      image: 'https://cdn.pixabay.com/photo/2019/06/07/15/50/mosque-4258647_1280.jpg',
      features: [
        'Vol direct Paris-Djeddah',
        'Hôtel 5* vue sur Haram',
        'Pension complète avec Iftar',
        'Guide francophone',
        'Transferts privés',
        'Visa Omra inclus'
      ],
      tag: 'Spécial Ramadan'
    }
  ];

  const hajjPackage = {
    title: 'Hajj 2024',
    price: '7 900 €',
    duration: '21 jours',
    date: '14 Juin 2024',
    image: 'https://cdn.pixabay.com/photo/2018/02/24/16/35/hajj-3178821_1280.jpg',
    features: [
      'Vol direct Paris-Djeddah',
      'Hôtels 5* à La Mecque et Médine',
      'Tentes VIP à Mina',
      'Pension complète',
      'Guide expert dédié',
      'Transport climatisé',
      'Visa Hajj inclus',
      'Formation aux rituels'
    ],
    tag: 'Hajj 2024'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Section Hajj */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">Hajj 2024</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Une expérience unique et inoubliable pour accomplir le cinquième pilier de l'Islam
          </p>
          <div className="max-w-4xl mx-auto">
            <PackageCard {...hajjPackage} />
          </div>
        </div>

        {/* Section Omra */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-4">Omra 2024</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Des départs mensuels pour La Mecque et Médine tout au long de l'année
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {omraPackages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
          </div>
        </div>
      </div>

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

export default Packages;
