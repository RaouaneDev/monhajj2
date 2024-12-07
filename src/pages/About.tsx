import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen py-16">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">À Propos de Notre Agence</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre partenaire de confiance pour vivre une expérience spirituelle authentique et sereine lors de votre Hajj ou Omra.
          </p>
        </div>

        {/* Notre Histoire */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6">Notre Histoire</h2>
          <p className="text-gray-700 mb-4">
            Depuis plus de 15 ans, notre agence s'est spécialisée dans l'organisation de voyages spirituels vers les lieux saints de l'Islam. Notre engagement est de rendre ces moments précieux accessibles à tous les musulmans de France.
          </p>
          <p className="text-gray-700">
            Fondée par des passionnés ayant eux-mêmes effectué de nombreux pèlerinages, notre équipe comprend profondément l'importance de ce voyage dans la vie d'un musulman.
          </p>
        </div>

        {/* Nos Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-primary text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3">Confiance</h3>
            <p className="text-gray-700">
              La transparence et l'honnêteté sont au cœur de notre relation avec nos pèlerins. Nous nous engageons à fournir un service clair et fiable.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-primary text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-3">Excellence</h3>
            <p className="text-gray-700">
              Nous visons l'excellence dans chaque aspect de nos services, de la préparation jusqu'au retour de nos pèlerins.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-primary text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-3">Accompagnement</h3>
            <p className="text-gray-700">
              Notre équipe vous accompagne à chaque étape, assurant votre confort et votre sérénité tout au long du voyage.
            </p>
          </div>
        </div>

        {/* Notre Équipe */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-8">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold mb-1">Ahmed Hassan</h3>
              <p className="text-gray-600">Directeur</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold mb-1">Sarah Mansouri</h3>
              <p className="text-gray-600">Guide Spirituel</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold mb-1">Karim Benali</h3>
              <p className="text-gray-600">Responsable Logistique</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold mb-1">Amira Zouari</h3>
              <p className="text-gray-600">Service Client</p>
            </div>
          </div>
        </div>

        {/* Nos Certifications */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6">Nos Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-white p-3 rounded-full">✓</div>
              <div>
                <h3 className="font-semibold mb-1">Agrément Ministère du Hajj</h3>
                <p className="text-gray-600">Autorisé par le Ministère du Hajj d'Arabie Saoudite</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-white p-3 rounded-full">✓</div>
              <div>
                <h3 className="font-semibold mb-1">Licence Tourisme</h3>
                <p className="text-gray-600">Agence de voyage agréée en France</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à Partir avec Nous ?</h2>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Contactez-Nous
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
