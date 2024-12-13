import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface RoomType {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  age: string;
  nationality: string;
  phone: string;
  email: string;
  package: string;
  roomType: string;
  message: string;
  numberOfPersons: string;
  termsAccepted: boolean;
}

// Configuration des forfaits
const packages: Package[] = [
  { 
    id: 'janvier2025',
    name: 'Omra Janvier 2025',
    price: 2500,
    description: 'Départ le 10 Janvier 2025 - 15 jours'
  },
  { 
    id: 'fevrier2025',
    name: 'Omra Février 2025',
    price: 2700,
    description: 'Départ le 15 Février 2025 - 12 jours'
  },
  { 
    id: 'mars2025',
    name: 'Omra Mars 2025',
    price: 2300,
    description: 'Départ le 5 Mars 2025 - 10 jours'
  },
];

const roomTypes: RoomType[] = [
  { id: 'quadruple', name: 'Chambre Quadruple', multiplier: 1.0, description: 'Chambre pour 4 personnes' },
  { id: 'triple', name: 'Chambre Triple', multiplier: 1.33, description: 'Chambre pour 3 personnes' },
  { id: 'double', name: 'Chambre Double', multiplier: 1.5, description: 'Chambre pour 2 personnes' },
];

// URL de l'API
const API_URL = process.env.REACT_APP_API_URL;
console.log('API URL configured:', API_URL);

// Assurez-vous que la clé publique est correctement chargée
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
console.log('Stripe Public Key:', STRIPE_PUBLIC_KEY);

if (!API_URL) {
  console.error('API_URL not configured. Please check environment variables.');
}

if (!STRIPE_PUBLIC_KEY) {
  console.error('STRIPE_PUBLIC_KEY not configured. Please check environment variables.');
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY || '');

interface PaymentFormProps {
  amount: number;
  deposit: number;
  remainingAmount: number;
  onSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, deposit, remainingAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardErrors, setCardErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleCardChange = (event: any, field: string) => {
    if (event.error) {
      setCardErrors(prev => ({
        ...prev,
        [field]: event.error.message
      }));
    } else {
      setCardErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement)!,
      });

      if (error) {
        setError(error.message || 'Une erreur est survenue');
        setProcessing(false);
        return;
      }

      // Appeler votre API backend avec paymentMethod.id
      console.log('Payment Method:', paymentMethod);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de carte
            </label>
            <div className="p-3 border rounded-md bg-white">
              <CardNumberElement 
                options={cardStyle}
                onChange={(e) => handleCardChange(e, 'cardNumber')}
              />
            </div>
            {cardErrors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{cardErrors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date d'expiration
              </label>
              <div className="p-3 border rounded-md bg-white">
                <CardExpiryElement 
                  options={cardStyle}
                  onChange={(e) => handleCardChange(e, 'cardExpiry')}
                />
              </div>
              {cardErrors.cardExpiry && (
                <p className="mt-1 text-sm text-red-600">{cardErrors.cardExpiry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <div className="p-3 border rounded-md bg-white">
                <CardCvcElement 
                  options={cardStyle}
                  onChange={(e) => handleCardChange(e, 'cardCvc')}
                />
              </div>
              {cardErrors.cardCvc && (
                <p className="mt-1 text-sm text-red-600">{cardErrors.cardCvc}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-600">Montant total : {amount}€</p>
          <p className="text-sm text-gray-600">Acompte à payer : {deposit}€</p>
          <p className="text-sm text-gray-600">Reste à payer : {remainingAmount}€</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
            processing ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </span>
          ) : (
            'Payer maintenant'
          )}
        </button>
      </form>
    </div>
  );
};

const initialFormState: FormData = {
  firstName: '',
  lastName: '',
  address: '',
  gender: '',
  age: '',
  nationality: '',
  phone: '',
  email: '',
  package: '',
  roomType: '',
  message: '',
  numberOfPersons: '1',
  termsAccepted: false
};

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  const [bookingType, setBookingType] = useState<'registration' | 'payment'>('registration');
  const [currentStep, setCurrentStep] = useState<'form' | 'payment'>('form');
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPayment, setShowPayment] = useState(false);

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateTotalPrice = useCallback((packageId: string, roomTypeId: string) => {
    const selectedPkg = packages.find(p => p.id === packageId);
    const selectedRoom = roomTypes.find(r => r.id === roomTypeId);
    const numberOfPersons = parseInt(formData.numberOfPersons) || 1;
    
    if (selectedPkg && selectedRoom) {
      const total = selectedPkg.price * selectedRoom.multiplier * numberOfPersons;
      const deposit = total * 0.3; // 30% deposit
      const remainingAmount = total * 0.7; // 70% remaining
      return { total, deposit, remainingAmount };
    }
  }, [formData.numberOfPersons]);

  const handlePackageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const packageId = event.target.value;
    setFormData(prev => ({ ...prev, package: packageId }));
  };

  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roomType = event.target.value;
    setSelectedRoomType(roomType);
    setFormData(prev => ({ ...prev, roomType }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update total price when number of persons changes
    if (name === 'numberOfPersons') {
      const priceInfo = updateTotalPrice(formData.package, formData.roomType);
      if (priceInfo) {
        const { total, deposit, remainingAmount } = priceInfo;
        console.log(total, deposit, remainingAmount);
      }
    }

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length >= 2 && /^[a-zA-ZÀ-ÿ\s-]+$/.test(value)
          ? ''
          : 'Ce champ doit contenir au moins 2 caractères et uniquement des lettres';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Veuillez entrer une adresse email valide';
      case 'phone':
        return /^[0-9]{10}$/.test(value)
          ? ''
          : 'Le numéro de téléphone doit contenir 10 chiffres';
      case 'termsAccepted':
        return value === 'true' ? '' : 'Vous devez accepter les conditions d\'inscription';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'message') return; // Le message est optionnel
      
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    if (!formData.package) {
      newErrors.package = 'Veuillez sélectionner un forfait';
      isValid = false;
    }
    if (!formData.roomType) {
      newErrors.roomType = 'Veuillez sélectionner un type de chambre';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBookingTypeChange = (type: 'registration' | 'payment') => {
    if (type === 'registration') {
      setCurrentStep('form');
      setShowPayment(false);
    } else {
      setCurrentStep('payment');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const registrationData = {
        ...formData,
        bookingType: 'registration',
        packageDetails: packages.find(p => p.id === formData.package),
        roomDetails: roomTypes.find(r => r.id === formData.roomType),
        registrationDate: new Date().toISOString(),
        numberOfPersons: parseInt(formData.numberOfPersons)
      };
      
      console.log('Registration data:', registrationData);
      navigate('/registration-success', {
        state: {
          formData,
          packageDetails: packages.find(p => p.id === formData.package),
          roomDetails: roomTypes.find(r => r.id === formData.roomType),
          numberOfPersons: parseInt(formData.numberOfPersons)
        }
      });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Réservation Monhajj',
      text: 'Un ami vous invite à réserver votre Omra 2025 avec Monhajj ! 🕋✨',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Lien copié ! Partagez-le avec vos amis intéressés par le voyage.');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  const handlePaymentSuccess = useCallback(() => {
    const registrationData = {
      ...formData,
      bookingType: 'payment',
      packageDetails: packages.find(p => p.id === formData.package),
      roomDetails: roomTypes.find(r => r.id === formData.roomType),
      registrationDate: new Date().toISOString(),
      numberOfPersons: parseInt(formData.numberOfPersons)
    };
    
    navigate('/registration-success', {
      state: {
        formData,
        packageDetails: packages.find(p => p.id === formData.package),
        roomDetails: roomTypes.find(r => r.id === formData.roomType),
        numberOfPersons: parseInt(formData.numberOfPersons),
        paymentCompleted: true
      }
    });
  }, [formData, navigate]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Bouton de retour en haut fixe */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-yellow-600 text-white shadow-lg transition-opacity duration-300 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
        aria-label="Retour en haut"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>

      {/* Contenu existant */}
      <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-xl p-6 sm:p-8 relative">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-600 mb-3">
            {currentStep === 'form' ? 'Réservez Votre Voyage Spirituel' : 'Finaliser Votre Réservation'}
          </h1>
          <p className="text-gray-600 mb-2">
            {currentStep === 'form' 
              ? 'Laissez-nous vous accompagner dans cette expérience unique et inoubliable' 
              : "Plus qu'une étape pour confirmer votre voyage"}
          </p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                currentStep === 'form' ? 'bg-yellow-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm">Informations</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-300"></div>
            <div className="flex items-center">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                currentStep === 'payment' ? 'bg-yellow-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm">Paiement</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-light">Informations personnelles</h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full py-3 px-4 border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                  placeholder="Votre prénom"
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full py-3 px-4 border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                  placeholder="Votre nom"
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className={`mt-1 block w-full py-3 px-4 border ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                placeholder="Votre adresse"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                  Genre
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full py-3 px-4 border ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                >
                  <option value="">Sélectionnez votre genre</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                  Âge
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="0"
                  max="100"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full py-3 px-4 border ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                  placeholder="Votre âge"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-300">
                Nationalité
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                required
                value={formData.nationality}
                onChange={handleInputChange}
                className={`mt-1 block w-full py-3 px-4 border ${
                  errors.nationality ? 'border-red-500' : 'border-gray-300'
                } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                placeholder="Votre nationalité"
              />
              {errors.nationality && (
                <p className="mt-1 text-sm text-red-500">{errors.nationality}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full py-3 px-4 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                  placeholder="Votre numéro de téléphone"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full py-3 px-4 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-light">Choix du forfait</h3>
            
            <div>
              <label htmlFor="package" className="block text-sm font-medium text-gray-300">
                Forfait
              </label>
              <select
                id="package"
                name="package"
                required
                value={formData.package}
                onChange={handlePackageChange}
                className={`mt-1 block w-full py-3 px-4 border ${
                  errors.package ? 'border-red-500' : 'border-gray-300'
                } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
              >
                <option value="">Sélectionnez un forfait</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.description} ({pkg.price}€)
                  </option>
                ))}
              </select>
              {errors.package && (
                <p className="mt-1 text-sm text-red-500">{errors.package}</p>
              )}
            </div>

            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-300">
                Type de chambre
              </label>
              <select
                id="roomType"
                name="roomType"
                required
                value={formData.roomType}
                onChange={handleRoomTypeChange}
                className={`mt-1 block w-full py-3 px-4 border ${
                  errors.roomType ? 'border-red-500' : 'border-gray-300'
                } bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base`}
              >
                <option value="">Sélectionnez le type de chambre</option>
                {roomTypes.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {room.description}
                  </option>
                ))}
              </select>
              {errors.roomType && (
                <p className="mt-1 text-sm text-red-500">{errors.roomType}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="numberOfPersons" className="block text-sm font-medium text-gray-700">
                  Nombre de personnes
                </label>
                <select
                  id="numberOfPersons"
                  name="numberOfPersons"
                  value={formData.numberOfPersons}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'personne' : 'personnes'}
                    </option>
                  ))}
                </select>
                {errors.numberOfPersons && (
                  <p className="mt-2 text-sm text-red-500">{errors.numberOfPersons}</p>
                )}
              </div>
            </div>

            {updateTotalPrice(formData.package, formData.roomType) && (
              <div className="mt-4 p-4 bg-gray-200 rounded-md">
                <p className="text-lg font-semibold text-yellow-light">
                  Prix total: {updateTotalPrice(formData.package, formData.roomType)?.total.toLocaleString()}€
                </p>
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    Acompte requis (30%): {updateTotalPrice(formData.package, formData.roomType)?.deposit.toLocaleString()}€
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    Un acompte minimum de 30% est requis pour confirmer votre réservation. 
                    Le reste du paiement pourra être effectué selon les modalités convenues avec notre agence.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Message optionnel */}
          <div className="mt-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Un message à nous transmettre ?
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Votre message (optionnel)"
              />
            </div>
          </div>

          {/* Message d'information et confirmation */}
          <div className="mt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Information importante
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      En soumettant ce formulaire, vous reconnaissez que :
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Votre inscription sera traitée par notre équipe dans les plus brefs délais</li>
                      <li>Un acompte de 30% sera requis pour confirmer définitivement votre réservation</li>
                      <li>Nous vous contacterons au numéro fourni pour finaliser votre dossier</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="form-checkbox h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  checked={formData.termsAccepted || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                />
                <span className="ml-2 text-sm text-gray-300">
                  J'ai lu et j'accepte les conditions d'inscription mentionnées ci-dessus
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-sm text-red-500">{errors.termsAccepted}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Valider l'inscription
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Partager
            </button>
          </div>

          {showPayment && (
            <div className="mt-8">
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  amount={updateTotalPrice(formData.package, formData.roomType)?.total} 
                  deposit={updateTotalPrice(formData.package, formData.roomType)?.deposit}
                  remainingAmount={updateTotalPrice(formData.package, formData.roomType)?.remainingAmount}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Booking;
