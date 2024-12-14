import React from 'react';

const GuideHajj: React.FC = () => {
  const etapes = [
    {
      titre: "Ihram",
      description: "L'entrée en état de sacralisation, marquée par le port de vêtements blancs et l'intention pure.",
      icon: "🕊️"
    },
    {
      titre: "Tawaf",
      description: "Les sept circumambulations autour de la Kaaba, symbole de l'unité divine.",
      icon: "🕋"
    },
    {
      titre: "Sa'i",
      description: "La marche entre Safa et Marwa, commémorant le parcours d'Hajar.",
      icon: "🚶"
    },
    {
      titre: "Mina",
      description: "Le séjour dans la vallée de Mina, première étape du pèlerinage.",
      icon: "⛺"
    },
    {
      titre: "Arafat",
      description: "Le jour crucial du Hajj, moment de prière et de contemplation.",
      icon: "🌄"
    },
    {
      titre: "Muzdalifah",
      description: "La nuit passée en plein air, préparation pour les rituels suivants.",
      icon: "🌙"
    }
  ];

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Guide du Hajj</h1>
          <p className="text-xl text-yellow-light max-w-3xl mx-auto">
            Un guide complet pour comprendre et préparer votre pèlerinage étape par étape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {etapes.map((etape, index) => (
            <div key={index} className="bg-dark-300 rounded-lg shadow-xl p-6">
              <div className="text-primary text-4xl mb-4">{etape.icon}</div>
              <h2 className="text-2xl font-bold text-primary mb-4">{etape.titre}</h2>
              <p className="text-yellow-light">{etape.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-dark-300 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Préparation Spirituelle</h2>
          <div className="text-yellow-light space-y-4">
            <p>Le Hajj est avant tout un voyage spirituel qui nécessite une préparation mentale et spirituelle adéquate.</p>
            <p>Nous vous accompagnons dans cette préparation avec :</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Des sessions d'orientation</li>
              <li>Des guides pratiques</li>
              <li>Un accompagnement personnalisé</li>
              <li>Des conseils d'experts</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => window.location.href = '/booking'}
            className="btn-primary"
          >
            Réserver Votre Hajj
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideHajj;
