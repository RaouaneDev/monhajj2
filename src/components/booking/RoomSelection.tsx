import React from 'react';

interface RoomSelectionProps {
  onSelect: (roomType: string) => void;
}

export const RoomSelection: React.FC<RoomSelectionProps> = ({ onSelect }) => {
  const rooms = [
    {
      type: 'double',
      name: 'Chambre Double',
      description: 'Idéale pour 2 personnes',
      price: 6500
    },
    {
      type: 'triple',
      name: 'Chambre Triple',
      description: 'Confortable pour 3 personnes',
      price: 6500
    },
    {
      type: 'quadruple',
      name: 'Chambre Quadruple',
      description: 'Spacieuse pour 4 personnes',
      price: 6500
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-secondary text-primary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Choisir votre Type de Chambre</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <button
            key={room.type}
            onClick={() => onSelect(room.type)}
            className="bg-dark-300 rounded-lg p-6 border border-primary/30 hover:bg-dark-200 text-left transition-all"
          >
            <h3 className="text-lg font-bold text-primary mb-2">{room.name}</h3>
            <p className="text-yellow-light mb-4">{room.description}</p>
            <p className="text-primary font-bold">{room.price}€/personne</p>
          </button>
        ))}
      </div>
    </div>
  );
}; 