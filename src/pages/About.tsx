import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="container-custom py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-6">À Propos de Notre Agence</h1>
          <p className="text-xl text-yellow-light max-w-3xl mx-auto">
            Votre partenaire de confiance pour vivre une expérience spirituelle authentique et sereine lors de votre Hajj ou Omra.
          </p>
        </div>

        {/* Notre Histoire */}
        <div className="bg-dark-300 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-6">Notre Histoire</h2>
          <p className="text-yellow-light mb-4">
            Depuis plus de 15 ans, notre agence s'est spécialisée dans l'organisation de voyages spirituels vers les lieux saints de l'Islam. Notre engagement est de rendre ces moments précieux accessibles à tous les musulmans de France.
          </p>
          <p className="text-yellow-light">
            Fondée par des passionnés ayant eux-mêmes effectué de nombreux pèlerinages, notre équipe comprend profondément l'importance de ce voyage dans la vie d'un musulman.
          </p>
        </div>

        {/* Nos Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-dark-300 rounded-lg shadow-xl p-6">
            <div className="text-primary text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Confiance</h3>
            <p className="text-yellow-light">
              La transparence et l'honnêteté sont au cœur de notre relation avec nos pèlerins. Nous nous engageons à fournir un service clair et fiable.
            </p>
          </div>
          <div className="bg-dark-300 rounded-lg shadow-xl p-6">
            <div className="text-primary text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Excellence</h3>
            <p className="text-yellow-light">
              Nous visons l'excellence dans chaque aspect de nos services, de la préparation jusqu'au retour de nos pèlerins.
            </p>
          </div>
          <div className="bg-dark-300 rounded-lg shadow-xl p-6">
            <div className="text-primary text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Accompagnement</h3>
            <p className="text-yellow-light">
              Notre équipe vous accompagne à chaque étape, assurant votre confort et votre sérénité tout au long du voyage.
            </p>
          </div>
        </div>

        {/* Notre Équipe */}
        <div className="bg-dark-300 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-8">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Répétez pour chaque membre */}
            <div className="text-center">
              <div className="w-32 h-32 bg-dark-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-primary mb-1">Ahmed Hassan</h3>
              <p className="text-yellow-light">Directeur</p>
            </div>
            {/* ... autres membres ... */}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Prêt à Partir avec Nous ?</h2>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="btn-primary"
          >
            Contactez-Nous
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
