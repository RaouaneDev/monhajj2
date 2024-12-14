import React from 'react';

const GuideOmra: React.FC = () => {
  const etapes = [
    {
      titre: "Ihram",
      description: "Entrer en état de sacralisation en portant les vêtements de l'Ihram et en formulant l'intention.",
      icon: "🕊️"
    },
    {
      titre: "Tawaf",
      description: "Effectuer sept tours autour de la Kaaba dans le sens inverse des aiguilles d'une montre.",
      icon: "🕋"
    },
    {
      titre: "Sa'i",
      description: "Parcourir sept fois la distance entre les monts Safa et Marwa.",
      icon: "🚶"
    },
    {
      titre: "Tahallul",
      description: "Se couper les cheveux pour marquer la fin des rites de l'Omra.",
      icon: "✂️"
    }
  ];

  const preparations = [
    {
      titre: "Préparation Spirituelle",
      points: [
        "Purification de l'intention",
        "Apprentissage des invocations",
        "Méditation et recueillement",
        "Demande de pardon"
      ]
    },
    {
      titre: "Préparation Pratique",
      points: [
        "Documents de voyage",
        "Vêtements appropriés",
        "Condition physique",
        "Vaccinations nécessaires"
      ]
    }
  ];

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Guide de l'Omra</h1>
          <p className="text-xl text-yellow-light max-w-3xl mx-auto">
            Découvrez les étapes essentielles pour accomplir votre Omra en toute sérénité
          </p>
        </div>

        {/* Étapes de l'Omra */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {etapes.map((etape, index) => (
            <div key={index} className="bg-dark-300 rounded-lg shadow-xl p-6">
              <div className="text-primary text-4xl mb-4">{etape.icon}</div>
              <h2 className="text-2xl font-bold text-primary mb-4">{etape.titre}</h2>
              <p className="text-yellow-light">{etape.description}</p>
            </div>
          ))}
        </div>

        {/* Sections de préparation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {preparations.map((prep, index) => (
            <div key={index} className="bg-dark-300 rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">{prep.titre}</h2>
              <ul className="space-y-3">
                {prep.points.map((point, idx) => (
                  <li key={idx} className="text-yellow-light flex items-center">
                    <span className="text-primary mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Notre accompagnement */}
        <div className="bg-dark-300 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Notre Accompagnement</h2>
          <div className="text-yellow-light space-y-4">
            <p>Nous vous accompagnons à chaque étape de votre voyage spirituel avec :</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Un guide expérimenté</li>
              <li>Des sessions de préparation</li>
              <li>Un support logistique complet</li>
              <li>Une assistance disponible 24/7</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => window.location.href = '/booking'}
            className="btn-primary"
          >
            Réserver Votre Omra
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideOmra;
