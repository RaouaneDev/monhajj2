import React, { useState, useCallback } from 'react';
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
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [isFormComplete, setIsFormComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });

  const handleCardChange = (event: any, field: string) => {
    if (event.error) {
      setCardErrors(prev => ({
        ...prev,
        [field]: event.error.message
      }));
      setIsFormComplete(prev => ({
        ...prev,
        [field]: false
      }));
    } else {
      setCardErrors(prev => ({
        ...prev,
        [field]: ''
      }));
      setIsFormComplete(prev => ({
        ...prev,
        [field]: event.complete
      }));
    }
  };

  const validateForm = () => {
    const { cardNumber, cardExpiry, cardCvc } = isFormComplete;
    if (!cardNumber || !cardExpiry || !cardCvc) {
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
      const cardElement = elements.getElement(CardNumberElement);
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

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  if (showSuccessMessage) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-600 mb-3">
            Merci pour votre inscription !
          </h1>
          <p className="text-gray-600 mb-2">
            Votre demande de réservation a été enregistrée avec succès.
          </p>
        </div>
        <p className="text-lg font-semibold text-yellow-light">
          Prix total: {totalPrice}€
        </p>
        <p className="text-lg font-semibold text-yellow-light">
          Acompte à payer: {deposit}€
        </p>
        <p className="text-lg font-semibold text-yellow-light">
          Reste à payer: {remainingAmount}€
        </p>
        <button
          type="button"
          onClick={handleProceedToPayment}
          className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Procéder au paiement
        </button>
      </div>
    );
  }

  return (
    // ... reste du code du formulaire existant ...
  );
};

export default Booking;
