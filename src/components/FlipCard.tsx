import React, { useState } from 'react';

interface FlipCardProps {
  frontImage: string;
  frontTitle: string;
  frontDescription: string;
  backTitle: string;
  backDescription: string;
  price?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontImage,
  frontTitle,
  frontDescription,
  backTitle,
  backDescription,
  price
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="flip-card cursor-pointer w-full h-[400px] perspective-1000"
      onClick={handleClick}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front de la carte */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="rounded-lg shadow-lg overflow-hidden h-full relative">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
              style={{ backgroundImage: `url(${frontImage})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative p-6 flex flex-col justify-end h-full">
              <h3 className="text-xl font-semibold mb-2 text-white">{frontTitle}</h3>
              <p className="text-gray-100 mb-4">{frontDescription}</p>
              {price && <p className="text-yellow-300 font-bold mb-4">À partir de {price}</p>}
            </div>
          </div>
        </div>

        {/* Dos de la carte */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="bg-yellow-300 text-gray-800 rounded-lg shadow-lg overflow-hidden h-full p-6">
            <h3 className="text-2xl font-semibold mb-4">{backTitle}</h3>
            <p className="text-lg whitespace-pre-line">{backDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
