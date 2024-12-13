import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    
    if (selectedPkg && selectedRoom) {
      const basePrice = selectedPkg.price;
      const numberOfPersons = parseInt(formData.numberOfPersons) || 1;
      const roomMultiplier = selectedRoom.multiplier;
      
      const totalPrice = basePrice * numberOfPersons * roomMultiplier;
      const depositAmount = totalPrice * 0.3; // 30% d'acompte
      const remainingAmount = totalPrice - depositAmount;
      
      setTotalPrice(totalPrice);
      setDeposit(Math.round(depositAmount));
      setRemainingAmount(Math.round(remainingAmount));
    }
  }, [formData.numberOfPersons]);

  // Effect to update price when package or roomType changes
  useEffect(() => {
    if (formData.package && formData.roomType) {
      updateTotalPrice(formData.package, formData.roomType);
    }
  }, [formData.package, formData.roomType, updateTotalPrice]);

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
      updateTotalPrice(formData.package, formData.roomType);
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
    updateTotalPrice(packageId, formData.roomType);
  };

  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roomType = event.target.value;
    setFormData(prev => ({ ...prev, roomType }));
    updateTotalPrice(formData.package, roomType);
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
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ 
          backgroundColor: 'white', 
          borderRadius: 2, 
          p: 4, 
          boxShadow: 3,
          textAlign: 'center'
        }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
              Réservation Confirmée !
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Merci {formData.firstName} {formData.lastName} pour votre confiance
            </Typography>
          </Box>

          <Box sx={{ my: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Détails de votre réservation
            </Typography>
            <Typography variant="body1" paragraph>
              Package : {packages.find(p => p.id === formData.package)?.name}
            </Typography>
            <Typography variant="body1" paragraph>
              Type de chambre : {roomTypes.find(r => r.id === formData.roomType)?.name}
            </Typography>
            <Typography variant="body1" paragraph>
              Nombre de personnes : {formData.numberOfPersons}
            </Typography>
          </Box>

          <Box sx={{ my: 4, p: 3, backgroundColor: 'primary.light', borderRadius: 1, color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Détails du paiement
            </Typography>
            <Typography variant="body1" paragraph>
              Montant total : {totalPrice}€
            </Typography>
            <Typography variant="body1" paragraph>
              Acompte à payer : {deposit}€
            </Typography>
            <Typography variant="body1" paragraph>
              Reste à payer : {remainingAmount}€
            </Typography>
          </Box>

          <Typography variant="body1" paragraph color="text.secondary">
            Un email de confirmation a été envoyé à {formData.email}
          </Typography>

          <Button
            variant="contained"
            onClick={handleProceedToPayment}
            sx={{
              mt: 3,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Procéder au paiement ({deposit}€)
          </Button>
        </Box>
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
