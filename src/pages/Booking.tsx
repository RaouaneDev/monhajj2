import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Container, Box, Typography, Button } from '@mui/material';

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

const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

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
    card: ''
  });
  const [isFormComplete, setIsFormComplete] = useState({
    card: false
  });

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardErrors(prev => ({
        ...prev,
        card: event.error.message
      }));
      setIsFormComplete(prev => ({
        ...prev,
        card: false
      }));
    } else {
      setCardErrors(prev => ({
        ...prev,
        card: ''
      }));
      setIsFormComplete(prev => ({
        ...prev,
        card: event.complete
      }));
    }
  };

  const validateForm = () => {
    const { card } = isFormComplete;
    if (!card) {
      setError('Veuillez remplir tous les champs de la carte bancaire correctement.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError('Erreur: Impossible de traiter le paiement');
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
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
              <CardElement 
                options={cardStyle}
                onChange={handleCardChange}
              />
            </div>
            {cardErrors.card && (
              <p className="mt-1 text-sm text-red-600">{cardErrors.card}</p>
            )}
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

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    package: '',
    roomType: '',
    numberOfPersons: '',
    termsAccepted: ''
  });

  const updateTotalPrice = useCallback((packageId: string, roomTypeId: string) => {
    const selectedPkg = packages.find(p => p.id === packageId);
    const selectedRoom = roomTypes.find(r => r.id === roomTypeId);
    const numberOfPersons = parseInt(formData.numberOfPersons) || 1;
    
    if (selectedPkg && selectedRoom) {
      const total = selectedPkg.price * selectedRoom.multiplier * numberOfPersons;
      const deposit = total * 0.3;
      const remainingAmount = total * 0.7;
      return { total, deposit, remainingAmount };
    }
  }, [formData.numberOfPersons]);

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) {
      return 'Ce champ est requis';
    }
    
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Email invalide';
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value) ? '' : 'Numéro de téléphone invalide';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'numberOfPersons') {
      const priceInfo = updateTotalPrice(formData.package, formData.roomType);
      if (priceInfo) {
        const { total, deposit, remainingAmount } = priceInfo;
        setTotalPrice(total);
        setDeposit(deposit);
        setRemainingAmount(remainingAmount);
      }
    }

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handlePackageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const packageId = event.target.value;
    setFormData(prev => ({ ...prev, package: packageId }));
  };

  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roomType = event.target.value;
    setFormData(prev => ({ ...prev, roomType }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      // Ici, vous pouvez envoyer les données du formulaire à votre backend
      console.log('Form submitted:', formData);
      
      // Afficher le message de succès
      setShowSuccessMessage(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/payment', {
      state: {
        amount: totalPrice,
        deposit: deposit,
        remainingAmount: remainingAmount
      }
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, package: pkg, roomType, numberOfPersons, termsAccepted } = formData;
    const { firstName: firstNameError, lastName: lastNameError, email: emailError, phone: phoneError } = errors;

    if (!firstName || !lastName || !email || !phone || !pkg || !roomType || !numberOfPersons || !termsAccepted) {
      return false;
    }

    if (firstNameError || lastNameError || emailError || phoneError) {
      return false;
    }

    return true;
  };

  if (showSuccessMessage) {
    return (
      <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary' }}>
            Merci pour votre inscription !
          </Typography>
          <Typography variant="body1" paragraph>
            Votre demande de réservation a été enregistrée avec succès.
          </Typography>
          <Typography variant="body1" paragraph>
            Montant total : {totalPrice}€
            <br />
            Acompte à payer : {deposit}€
            <br />
            Reste à payer : {remainingAmount}€
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          onClick={handleProceedToPayment}
          sx={{
            backgroundColor: 'primary',
            '&:hover': {
              backgroundColor: 'primaryDark',
            },
          }}
        >
          Procéder au paiement
        </Button>
      </Container>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-yellow-600 text-white shadow-lg transition-opacity duration-300 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
            Réservez Votre Voyage Spirituel
          </h1>
          <p className="text-gray-600 mb-2">
            Laissez-nous vous accompagner dans cette expérience unique et inoubliable
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="package" className="block text-sm font-medium text-gray-700">
                Forfait
              </label>
              <select
                id="package"
                name="package"
                value={formData.package}
                onChange={handlePackageChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                required
              >
                <option value="">Sélectionnez un forfait</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.price}€
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                Type de chambre
              </label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleRoomTypeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                required
              >
                <option value="">Sélectionnez un type de chambre</option>
                {roomTypes.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="numberOfPersons" className="block text-sm font-medium text-gray-700">
                Nombre de personnes
              </label>
              <select
                id="numberOfPersons"
                name="numberOfPersons"
                value={formData.numberOfPersons}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                required
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'personne' : 'personnes'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (optionnel)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                J'accepte les conditions d'inscription
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Valider l'inscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
