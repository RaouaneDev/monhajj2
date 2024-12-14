import React from 'react';
import { Link } from 'react-router-dom';

export const PackageList: React.FC = () => {
  return (
    <div className="container-custom py-12">
      {/* Section Hajj */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Hajj 2025</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Hajj Standard */}
          <div className="bg-dark-300 rounded-lg p-8 border border-primary/30 relative group perspective">
            <div className="relative duration-1000 preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="backface-hidden">
                <h3 className="text-xl font-bold text-primary mb-4">Standard</h3>
                <div className="text-yellow-light space-y-4">
                  <p className="text-3xl font-bold text-primary">6500€</p>
                </div>
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg p-8">
                <h3 className="text-xl font-bold text-black mb-4">Standard</h3>
                <div className="space-y-2 text-black">
                  <p>✓ Vol aller-retour</p>
                  <p>✓ Hébergement</p>
                  <p>✓ Transport sur place</p>
                  <p>✓ Accompagnement spirituel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hajj Confort */}
          <div className="bg-gradient-to-br from-primary/20 to-dark-300 rounded-lg p-8 border border-primary relative group perspective">
            <div className="relative duration-1000 preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="backface-hidden">
                <h3 className="text-xl font-bold text-primary mb-4">Confort</h3>
                <div className="text-yellow-light space-y-4">
                  <p className="text-3xl font-bold text-primary">8450€</p>
                </div>
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg p-8">
                <h3 className="text-xl font-bold text-black mb-4">Confort</h3>
                <div className="space-y-2 text-black">
                  <p>✓ Tous les avantages Standard</p>
                  <p>✓ Hôtels premium</p>
                  <p>✓ Repas inclus</p>
                  <p>✓ Service conciergerie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hajj Premium */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-dark-300 rounded-lg p-8 border border-yellow-500 relative group perspective">
            <div className="relative duration-1000 preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="backface-hidden">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Premium</h3>
                <div className="text-yellow-light space-y-4">
                  <p className="text-3xl font-bold text-yellow-500">9750€</p>
                </div>
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg p-8">
                <h3 className="text-xl font-bold text-black mb-4">Premium</h3>
                <div className="space-y-2 text-black">
                  <p>✓ Tous les avantages Confort</p>
                  <p>✓ Hôtels 5 étoiles</p>
                  <p>✓ Service VIP</p>
                  <p>✓ Guide personnel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Omra */}
      <div>
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Omra 2025</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Omra Standard */}
          <div className="bg-dark-300 rounded-lg p-8 border border-primary/30">
            <h3 className="text-xl font-bold text-primary mb-4">Standard</h3>
            <div className="text-yellow-light space-y-4">
              <p className="text-3xl font-bold text-primary">1500€</p>
              <div className="space-y-2">
                <p>✓ Vol aller-retour</p>
                <p>✓ Hébergement</p>
                <p>✓ Transport sur place</p>
                <p>✓ Accompagnement spirituel</p>
              </div>
            </div>
          </div>

          {/* Omra Confort */}
          <div className="bg-gradient-to-br from-primary/20 to-dark-300 rounded-lg p-8 border border-primary relative">
            <h3 className="text-xl font-bold text-primary mb-4">Confort</h3>
            <div className="text-yellow-light space-y-4">
              <p className="text-3xl font-bold text-primary">2000€</p>
              <div className="space-y-2">
                <p>✓ Tous les avantages Standard</p>
                <p>✓ Hôtels premium</p>
                <p>✓ Repas inclus</p>
                <p>✓ Service conciergerie</p>
              </div>
            </div>
            <div className="absolute top-4 right-4">⭐</div>
          </div>

          {/* Omra Premium */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-dark-300 rounded-lg p-8 border border-yellow-500 relative">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Premium</h3>
            <div className="text-yellow-light space-y-4">
              <p className="text-3xl font-bold text-yellow-500">2500€</p>
              <div className="space-y-2">
                <p>✓ Tous les avantages Confort</p>
                <p>✓ Hôtels 5 étoiles</p>
                <p>✓ Service VIP</p>
                <p>✓ Guide personnel</p>
              </div>
            </div>
            <div className="absolute top-4 right-4">👑</div>
          </div>
        </div>

        {/* Section Ramadhan */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-black px-6 py-3 rounded-full">
            <p className="text-white font-bold">
              Forfaits spéciaux Ramadhan disponibles en Mars 2025
            </p>
          </div>
        </div>
      </div>

      {/* Bouton Réserver */}
      <div className="text-center mt-12">
        <Link to="/booking" className="btn-primary">
          Réserver maintenant
        </Link>
      </div>
    </div>
  );
}; 