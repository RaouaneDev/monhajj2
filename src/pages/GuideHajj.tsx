import React from 'react';

const GuideHajj: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen py-16">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-12">Guide du Hajj</h1>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction au Hajj</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Le Hajj est le cinquième pilier de l'Islam, un pèlerinage obligatoire que chaque musulman doit accomplir une fois dans sa vie s'il en a les moyens physiques et financiers. Ce voyage spirituel unique se déroule à La Mecque et ses environs pendant le dernier mois du calendrier islamique.
            </p>
            <p className="text-gray-700">
              Chaque année, des millions de musulmans du monde entier se rassemblent à La Mecque pour accomplir ce rituel sacré, marchant sur les pas du Prophète Muhammad (paix et bénédiction sur lui) et du Prophète Ibrahim (paix sur lui).
            </p>
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Points Importants :</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Le Hajj a lieu pendant le mois de Dhul Hijjah</li>
                <li>La durée minimale est de 5 jours</li>
                <li>Un visa spécial Hajj est requis</li>
                <li>Une préparation physique et spirituelle est nécessaire</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Les Conditions du Hajj */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Les Conditions du Hajj</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Conditions d'Obligation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Être musulman</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Être pubère et sain d'esprit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Être libre (non esclave)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Avoir les moyens financiers</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Conditions de Validité</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">L'intention (Niyyah)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Accomplir les rituels dans leur temps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Être en état de sacralisation (Ihram)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Accomplir tous les rituels obligatoires</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Les Étapes du Hajj */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Les Étapes du Hajj Jour par Jour</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-3">Jour 1 : 8 Dhul Hijjah</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Entrée en état d'Ihram</li>
                <li>• Récitation de la Talbiyah</li>
                <li>• Départ pour Mina</li>
                <li>• Prières à Mina</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-3">Jour 2 : 9 Dhul Hijjah (Yawm 'Arafah)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Départ pour Arafat après le lever du soleil</li>
                <li>• Station à Arafat (Wuquf)</li>
                <li>• Prières et invocations</li>
                <li>• Départ pour Muzdalifah après le coucher du soleil</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-3">Jour 3 : 10 Dhul Hijjah</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Lapidation de Jamarat Al-Aqabah</li>
                <li>• Sacrifice de l'animal</li>
                <li>• Rasage ou raccourcissement des cheveux</li>
                <li>• Tawaf Al-Ifadah</li>
                <li>• Sa'i entre Safa et Marwa</li>
              </ul>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-3">Jours 4-5-6 : 11-13 Dhul Hijjah</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Séjour à Mina</li>
                <li>• Lapidation des trois Jamarats</li>
                <li>• Tawaf d'adieu avant de quitter La Mecque</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conseils Pratiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Préparation Physique</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Exercices de marche réguliers</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Bilan médical complet</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Vaccinations nécessaires</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Adaptation au décalage horaire</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Préparation Spirituelle</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Apprentissage des rituels</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Mémorisation des invocations</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Repentir sincère</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Règlement des dettes</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Bagages Essentiels</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Vêtements d'Ihram</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Médicaments personnels</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Chaussures confortables</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>Protection solaire</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interdictions pendant l'Ihram */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Interdictions pendant l'Ihram</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Pour les Hommes et les Femmes</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Se couper les ongles ou les cheveux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Utiliser du parfum</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Relations conjugales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Chasser ou tuer des animaux</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Spécifique aux Hommes</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Porter des vêtements cousus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Se couvrir la tête</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>Porter des chaussures fermées</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt pour ce voyage spirituel ?</h2>
          <p className="mb-6 text-lg">Nos experts sont là pour vous accompagner dans chaque étape de votre Hajj.</p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contactez-Nous
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideHajj;
