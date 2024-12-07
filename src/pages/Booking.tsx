import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Configuration des forfaits
const packages = [
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

const roomTypes = [
  { id: 'quadruple', name: 'Chambre Quadruple', multiplier: 1.0, description: 'Chambre pour 4 personnes' },
  { id: 'triple', name: 'Chambre Triple', multiplier: 1.33, description: 'Chambre pour 3 personnes' },
  { id: 'double', name: 'Chambre Double', multiplier: 1.5, description: 'Chambre pour 2 personnes' },
];

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYibyVKJiUILauZcrVqcFm1I20S4-_DKIS2LYcog38VWrj8KDkJ_MO2OzSR87_f8X_/exec';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // État initial du formulaire
  const initialFormState = {
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
    message: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  // Calcul du prix total quand le forfait ou le type de chambre change
  useEffect(() => {
    if (formData.package && formData.roomType) {
      const selectedPackage = packages.find(pkg => pkg.id === formData.package);
      const selectedRoom = roomTypes.find(room => room.id === formData.roomType);
      
      if (selectedPackage && selectedRoom) {
        const basePrice = selectedPackage.price;
        const finalPrice = Math.round(basePrice * selectedRoom.multiplier);
        setTotalPrice(finalPrice.toString());
      }
    } else {
      setTotalPrice('');
    }
  }, [formData.package, formData.roomType]);

  // Gestion des changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const selectedPackage = packages.find(pkg => pkg.id === formData.package);
      const selectedRoom = roomTypes.find(room => room.id === formData.roomType);
      
      // Préparation des données à envoyer
      const dataToSend = new URLSearchParams();
      dataToSend.append('firstName', formData.firstName.trim());
      dataToSend.append('lastName', formData.lastName.trim());
      dataToSend.append('address', formData.address.trim());
      dataToSend.append('gender', formData.gender === 'male' ? 'Homme' : 'Femme');
      dataToSend.append('age', formData.age);
      dataToSend.append('nationality', formData.nationality.trim());
      dataToSend.append('phone', formData.phone.trim());
      dataToSend.append('email', formData.email.trim());
      dataToSend.append('formule', selectedPackage?.name || '');
      dataToSend.append('prix_base', selectedPackage?.price.toString() || '');
      dataToSend.append('type_chambre', selectedRoom?.name || '');
      dataToSend.append('description_chambre', selectedRoom?.description || '');
      dataToSend.append('prix_total', totalPrice);
      dataToSend.append('message', formData.message.trim());

      // Log pour débogage
      console.log('Données envoyées:', Object.fromEntries(dataToSend));

      // Construction de l'URL avec les paramètres
      const urlWithParams = `${GOOGLE_SCRIPT_URL}?${dataToSend.toString()}`;
      
      await fetch(urlWithParams, {
        method: 'GET',
        mode: 'no-cors'
      });

      setSubmitStatus('success');
      setShowSuccess(true);
      setFormData(initialFormState);
      setTotalPrice('');
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction de partage
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
        // Fallback pour les navigateurs qui ne supportent pas l'API de partage
        navigator.clipboard.writeText(window.location.href);
        alert('Lien copié ! Partagez-le avec vos amis intéressés par le voyage.');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-dark-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 bg-blue-600 text-white p-2 rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300 z-50 flex items-center justify-center w-8 h-8 border border-white"
          aria-label="Retour en haut"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
      <div className="max-w-3xl mx-auto bg-dark-100 rounded-lg shadow-xl p-6 sm:p-8">
        {/* Bouton retour */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-yellow-500 hover:text-yellow-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </button>

        {/* Bouton de partage */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleShare}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            <span>Un ami intéressé ? Partager le lien</span>
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-yellow-light mb-8">
          Réservation de Voyage
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
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
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                  placeholder="Votre prénom"
                />
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
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                  placeholder="Votre nom"
                />
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
                className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                placeholder="Votre adresse"
              />
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
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                >
                  <option value="">Sélectionnez votre genre</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
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
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                  placeholder="Votre âge"
                  min="18"
                  max="120"
                />
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
                className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                placeholder="Votre nationalité"
              />
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
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                  placeholder="Votre numéro de téléphone"
                />
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
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                  placeholder="Votre email"
                />
              </div>
            </div>
          </div>

          {/* Choix du forfait et de la chambre */}
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
                onChange={handleInputChange}
                className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
              >
                <option value="">Sélectionnez un forfait</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.description} ({pkg.price}€)
                  </option>
                ))}
              </select>
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
                onChange={handleInputChange}
                className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
              >
                <option value="">Sélectionnez le type de chambre</option>
                {roomTypes.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {room.description}
                  </option>
                ))}
              </select>
            </div>

            {totalPrice && (
              <div className="mt-4 p-4 bg-dark-300 rounded-md">
                <p className="text-lg font-semibold text-yellow-light">
                  Prix total: {totalPrice}€
                </p>
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    Acompte requis (20%): {Math.ceil(parseInt(totalPrice) * 0.2)}€
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    Un acompte minimum de 20% est requis pour confirmer votre réservation. 
                    Le reste du paiement pourra être effectué selon les modalités convenues avec notre agence.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Message optionnel */}
          <div className="mt-12 mb-8">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-3">
              Un message à nous transmettre ?
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
              rows={4}
              placeholder="Message supplémentaire (optionnel)"
            />
          </div>

          {/* Bouton de soumission */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white text-lg font-medium transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                'Réserver maintenant'
              )}
            </button>
          </div>
        </form>

        {/* Messages de statut */}
        {showSuccess && submitStatus === 'success' && (
          <div className="fixed top-4 right-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-lg animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <p className="font-bold">Réservation envoyée avec succès !</p>
                  <p className="text-sm">Nous vous contacterons bientôt.</p>
                </div>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="ml-4 text-green-700 hover:text-green-900"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="mt-6 flex flex-col items-center space-y-4">
            <p className="text-green-500 text-center">
              Votre réservation a été enregistrée avec succès !
            </p>
            {/* <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
            >
              Retourner à l'accueil
            </button> */}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded animate-fade-in">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <div>
                <p className="font-bold">Erreur lors de l'envoi</p>
                <p className="text-sm">Veuillez réessayer ou nous contacter au +33 7 75 70 24 64</p>
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-sm text-gray-400 text-center">
          Nous traiterons votre demande dans les plus brefs délais.
        </p>
      </div>
    </div>
  );
};

export default Booking;
