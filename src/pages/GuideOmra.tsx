import React from 'react';

const GuideOmra: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-8">Guide de l'Omra</h1>
        
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Qu'est-ce que l'Omra ?</h2>
          <p className="text-gray-600 mb-4">
            L'Omra est un pèlerinage qui peut être accompli à tout moment de l'année à La Mecque. 
            Bien qu'elle ne soit pas obligatoire comme le Hajj, l'Omra est une expérience spirituelle 
            très enrichissante pour tout musulman.
          </p>
        </div>

        {/* Étapes de l'Omra */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Les Étapes de l'Omra</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">1. L'Ihram</h3>
              <p className="text-gray-600">
                - Entrer en état de sacralisation avant le Miqat<br />
                - Porter les vêtements de l'Ihram pour les hommes<br />
                - Formuler l'intention (Niya) de faire l'Omra<br />
                - Prononcer la Talbiya
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">2. Le Tawaf</h3>
              <p className="text-gray-600">
                - Effectuer 7 tours autour de la Kaaba<br />
                - Commencer et terminer à la Pierre Noire<br />
                - Faire des invocations pendant le Tawaf<br />
                - Prier 2 rakaats après le Tawaf
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">3. Le Sa'i</h3>
              <p className="text-gray-600">
                - Parcourir 7 fois la distance entre Safa et Marwa<br />
                - Commencer par Safa<br />
                - Faire des invocations pendant le Sa'i<br />
                - Marcher ou courir légèrement selon les zones
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold mb-2">4. Le Taqsir ou Halq</h3>
              <p className="text-gray-600">
                - Raccourcir ou raser les cheveux pour les hommes<br />
                - Couper une mèche de cheveux pour les femmes<br />
                - Cet acte marque la fin de l'état d'Ihram
              </p>
            </div>
          </div>
        </div>

        {/* Conseils pratiques */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Conseils Pratiques</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Avant le Départ</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Vérifier la validité du passeport (6 mois minimum)</li>
                <li>S'assurer d'avoir tous les vaccins nécessaires</li>
                <li>Préparer une petite trousse de médicaments</li>
                <li>Apprendre les invocations essentielles</li>
                <li>Se renseigner sur la météo pour la période du voyage</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Sur Place</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Boire beaucoup d'eau (Zam-Zam disponible partout)</li>
                <li>Se protéger du soleil</li>
                <li>Garder ses documents en lieu sûr</li>
                <li>Suivre les conseils du guide</li>
                <li>Respecter les lieux saints et les autres pèlerins</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interdictions pendant l'Ihram */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Interdictions pendant l'Ihram</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Pour Tous</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Se couper les ongles</li>
                <li>Se couper les cheveux</li>
                <li>Utiliser du parfum</li>
                <li>Chasser ou tuer des animaux</li>
                <li>Se marier ou célébrer un mariage</li>
                <li>Avoir des relations conjugales</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Spécifique aux Hommes</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Porter des vêtements cousus</li>
                <li>Se couvrir la tête directement</li>
                <li>Porter des chaussures couvrant les chevilles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideOmra;
