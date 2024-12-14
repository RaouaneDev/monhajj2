import React from 'react';

interface FlipCardProps {
  frontTitle: string;
  frontDescription: string;
  backTitle: string;
  backDescription: string;
  price: string;
  badge?: string;
  isSelected?: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontTitle,
  frontDescription,
  backTitle,
  backDescription,
  price,
  badge,
  isSelected
}) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className={`flip-card-front bg-gradient-to-br from-dark-300 to-dark-200 ${
          isSelected ? 'border-2 border-green-500' : ''
        }`}>
          <div className="p-6">
            {isSelected && (
              <div className="absolute top-2 left-2 text-green-500">
                <span className="mr-2">✓</span>
                Sélectionné
              </div>
            )}
            <h3 className="text-xl font-bold text-primary mb-2">{frontTitle}</h3>
            <p className="text-yellow-light">{frontDescription}</p>
            <p className="text-2xl font-bold text-primary mt-4">{price}</p>
          </div>
          {badge && (
            <div className={`absolute top-2 right-2 ${
              badge === 'Places limitées' 
                ? 'bg-red-500/20 text-red-500 animate-pulse'
                : badge.includes('RAMADHAN')
                ? 'bg-black text-white'
                : ''
            } px-3 py-1 rounded-full text-xs font-bold`}>
              {badge}
            </div>
          )}
        </div>
        <div className="flip-card-back bg-white p-6 rounded-lg">
          <h3 className="text-xl font-bold text-black mb-4">{backTitle}</h3>
          <div className="text-black whitespace-pre-line">
            {backDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
