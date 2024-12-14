import React from 'react';

interface Package {
  id: string;
  type: 'hajj' | 'omra';
  name: string;
  date: Date;
  category: 'standard' | 'confort' | 'premium';
  price: number;
}

interface BookingCalendarProps {
  onSelect: (packageInfo: Package) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onSelect }) => {
  const calculatePrice = (basePrice: number, category: string, type: string) => {
    if (type === 'omra') {
      switch(category) {
        case 'standard':
          return 1500;
        case 'confort':
          return 2000;
        case 'premium':
          return 2500;
        default:
          return 1500;
      }
    }
    
    switch(category) {
      case 'standard':
        return basePrice;
      case 'confort':
        return basePrice + (basePrice * 0.3);
      case 'premium':
        return basePrice + (basePrice * 0.5);
      default:
        return basePrice;
    }
  };

  const basePrice = 6500;
  const packages: Package[] = [
    {
      id: 'hajj-2025-standard',
      type: 'hajj',
      name: 'Hajj 2025 Standard',
      date: new Date(2025, 5, 15),
      category: 'standard',
      price: calculatePrice(basePrice, 'standard', 'hajj')
    },
    {
      id: 'hajj-2025-confort',
      type: 'hajj',
      name: 'Hajj 2025 Confort',
      date: new Date(2025, 5, 15),
      category: 'confort',
      price: calculatePrice(basePrice, 'confort', 'hajj')
    },
    {
      id: 'hajj-2025-premium',
      type: 'hajj',
      name: 'Hajj 2025 Premium',
      date: new Date(2025, 5, 15),
      category: 'premium',
      price: calculatePrice(basePrice, 'premium', 'hajj')
    },
    {
      id: 'omra-janvier-standard',
      type: 'omra',
      name: 'Omra Janvier 2025 Standard',
      date: new Date(2025, 0, 15),
      category: 'standard',
      price: calculatePrice(basePrice, 'standard', 'omra')
    },
    {
      id: 'omra-janvier-confort',
      type: 'omra',
      name: 'Omra Janvier 2025 Confort',
      date: new Date(2025, 0, 15),
      category: 'confort',
      price: calculatePrice(basePrice, 'confort', 'omra')
    },
    {
      id: 'omra-janvier-premium',
      type: 'omra',
      name: 'Omra Janvier 2025 Premium',
      date: new Date(2025, 0, 15),
      category: 'premium',
      price: calculatePrice(basePrice, 'premium', 'omra')
    },
    {
      id: 'omra-fevrier-standard',
      type: 'omra',
      name: 'Omra Février 2025 Standard',
      date: new Date(2025, 1, 15),
      category: 'standard',
      price: calculatePrice(basePrice, 'standard', 'omra')
    },
    {
      id: 'omra-fevrier-confort',
      type: 'omra',
      name: 'Omra Février 2025 Confort',
      date: new Date(2025, 1, 15),
      category: 'confort',
      price: calculatePrice(basePrice, 'confort', 'omra')
    },
    {
      id: 'omra-fevrier-premium',
      type: 'omra',
      name: 'Omra Février 2025 Premium',
      date: new Date(2025, 1, 15),
      category: 'premium',
      price: calculatePrice(basePrice, 'premium', 'omra')
    },
    {
      id: 'omra-mars-standard',
      type: 'omra',
      name: 'Omra Ramadhan 2025 Standard',
      date: new Date(2025, 2, 15),
      category: 'standard',
      price: calculatePrice(basePrice, 'standard', 'omra')
    },
    {
      id: 'omra-mars-confort',
      type: 'omra',
      name: 'Omra Ramadhan 2025 Confort',
      date: new Date(2025, 2, 15),
      category: 'confort',
      price: calculatePrice(basePrice, 'confort', 'omra')
    },
    {
      id: 'omra-mars-premium',
      type: 'omra',
      name: 'Omra Ramadhan 2025 Premium',
      date: new Date(2025, 2, 15),
      category: 'premium',
      price: calculatePrice(basePrice, 'premium', 'omra')
    }
  ];

  const getCategoryStyle = (category: string, name: string) => {
    const isRamadhan = name.includes('Ramadhan');
    
    switch(category) {
      case 'standard':
        return {
          container: `bg-dark-300 border-primary/30 ${isRamadhan ? 'border-2' : ''} p-8`,
          title: 'text-primary',
          price: 'text-primary'
        };
      case 'confort':
        return {
          container: `bg-gradient-to-br from-primary/20 to-dark-300 border-primary ${isRamadhan ? 'border-2' : ''} p-8`,
          title: 'text-primary',
          price: 'text-primary font-bold'
        };
      case 'premium':
        return {
          container: `bg-gradient-to-br from-yellow-500/20 to-dark-300 border-yellow-500 ${isRamadhan ? 'border-2' : ''} p-8`,
          title: 'text-yellow-500',
          price: 'text-yellow-500 font-bold'
        };
      default:
        return {
          container: 'bg-dark-300 border-primary/30 p-8',
          title: 'text-primary',
          price: 'text-primary'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-secondary text-primary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Choisir votre Forfait et Date</h2>
      
      {/* Section Hajj */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Hajj 2025</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {packages
            .filter(pkg => pkg.type === 'hajj')
            .map(pkg => {
              const style = getCategoryStyle(pkg.category, pkg.name);
              const isHajjStandard = pkg.type === 'hajj' && pkg.category === 'standard';
              
              return (
                <button
                  key={pkg.id}
                  onClick={() => onSelect(pkg)}
                  className={`${style.container} rounded-lg p-6 border hover:scale-105 transition-all duration-300 text-left relative overflow-hidden`}
                >
                  {pkg.category !== 'standard' && (
                    <div className="absolute top-2 right-2">
                      {pkg.category === 'premium' ? '👑' : '⭐'}
                    </div>
                  )}
                  {isHajjStandard && (
                    <div className="absolute top-2 right-2 bg-red-500/20 px-2 py-1 rounded-full text-xs font-bold text-red-500 animate-pulse">
                      Places limitées
                    </div>
                  )}
                  <h4 className={`text-lg font-bold mb-2 ${style.title}`}>{pkg.name}</h4>
                  <div className="space-y-2">
                    <p className="text-yellow-light">
                      Départ : {pkg.date.toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-yellow-light opacity-75">
                        {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                      </span>
                      <span className={`text-xl ${style.price}`}>{pkg.price}€</span>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {/* Section Omra */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Omra 2025</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {packages
            .filter(pkg => pkg.type === 'omra')
            .map(pkg => {
              const style = getCategoryStyle(pkg.category, pkg.name);
              const isRamadhan = pkg.name.includes('Ramadhan');
              
              return (
                <button
                  key={pkg.id}
                  onClick={() => onSelect(pkg)}
                  className={`${style.container} rounded-lg p-6 border hover:scale-105 transition-all duration-300 text-left relative overflow-hidden`}
                >
                  {pkg.category !== 'standard' && (
                    <div className="absolute top-2 right-2">
                      {pkg.category === 'premium' ? '👑' : '⭐'}
                    </div>
                  )}
                  {isRamadhan && (
                    <div className="absolute top-2 left-2 bg-black px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg transform hover:scale-105 transition-all">
                      RAMADHAN
                    </div>
                  )}
                  <h4 className={`text-lg font-bold mb-2 ${style.title}`}>{pkg.name}</h4>
                  <div className="space-y-2">
                    <p className="text-yellow-light">
                      Départ : {pkg.date.toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-yellow-light opacity-75">
                        {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                      </span>
                      <span className={`text-xl ${style.price}`}>{pkg.price}€</span>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}; 