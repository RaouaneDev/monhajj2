import React, { useState, useEffect } from 'react';
import { scrollToTop } from '../../utils/scrollUtils';

interface ClientInfo {
  title: 'Mr' | 'Mme';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
}

interface FormData {
  clients: ClientInfo[];
  numberOfPeople: number;
  roomType: string;
  packageType: string;
}

interface Package {
  id: string;
  type: 'hajj' | 'omra';
  name: string;
  date: Date;
  price: number;
  category: 'standard' | 'confort' | 'premium';
}

interface BookingFormProps {
  onSubmit: (data: any) => void;
  initialPackage: Package | null;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, initialPackage }) => {
  const [formStep, setFormStep] = useState(1); // 1: Infos de base, 2: Infos complémentaires, 3: Contact d'urgence, 4: Prix
  const [currentClientIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    clients: [{
      title: 'Mr',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    }],
    numberOfPeople: 1,
    roomType: '',
    packageType: initialPackage?.id || ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Prix par personne (le même pour tous les types de chambre)
 

  // Calculer le prix total en fonction du forfait sélectionné
  useEffect(() => {
    if (initialPackage) {
      // Utiliser directement le prix du package sélectionné
      const total = initialPackage.price;
    setTotalPrice(total);
    }
  }, [initialPackage]);

  const validateField = (name: string, value: string) => {
    switch(name) {
      case 'firstName':
        return value ? '' : 'Le prénom est obligatoire';
      case 'lastName':
        return value ? '' : 'Le nom est obligatoire';
      case 'email':
        if (!value) return 'L\'email est obligatoire';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email invalide';
        return '';
      case 'phone':
        if (!value) return 'Le téléphone est obligatoire';
        if (!/^[0-9+\s-]{8,}$/.test(value)) return 'Numéro de téléphone invalide';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Valider le champ
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Mettre à jour les données
    if (name === 'numberOfPeople') {
      const newNumber = parseInt(value);
      setFormData(prev => {
        const newClients = [...prev.clients];
        if (newNumber > prev.clients.length) {
          // Ajouter des clients
          for (let i = prev.clients.length; i < newNumber; i++) {
            newClients.push({
              title: 'Mr',
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              dateOfBirth: '',
              nationality: '',
              passportNumber: '',
              passportExpiry: '',
              address: '',
              city: '',
              postalCode: '',
              country: '',
              emergencyContact: {
                name: '',
                phone: '',
                relationship: ''
              }
            });
          }
        } else if (newNumber < prev.clients.length) {
          // Supprimer des clients
          newClients.splice(newNumber);
        }
        return {
          ...prev,
          clients: newClients,
          numberOfPeople: newNumber
        };
      });
    } else {
      // Mettre à jour les informations du client actuel
      setFormData(prev => ({
        ...prev,
        clients: prev.clients.map((client, index) => 
          index === currentClientIndex
            ? { ...client, [name]: value }
            : client
        )
      }));
    }
  };

  

  const isCurrentClientValid = () => {
    const currentClient = formData.clients[currentClientIndex];
    const newErrors: {[key: string]: string} = {};
    
    // Valider tous les champs obligatoires
    newErrors.firstName = validateField('firstName', currentClient.firstName);
    newErrors.lastName = validateField('lastName', currentClient.lastName);
    newErrors.email = validateField('email', currentClient.email);
    newErrors.phone = validateField('phone', currentClient.phone);

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(0);

  const handlePaymentOption = (percentage: number) => {
    const amount = totalPrice * percentage;
    setSelectedPaymentAmount(parseFloat(amount.toFixed(2)));
  };

  const handleSubmitForm = () => {
    if (!isCurrentClientValid()) {
      alert('Veuillez remplir tous les champs obligatoires correctement');
      return;
    }

    if (selectedPaymentAmount === 0) {
      alert('Veuillez sélectionner une option de paiement');
      return;
    }

      onSubmit({
        ...formData,
        totalPrice: totalPrice,
        paymentAmount: selectedPaymentAmount,
        remainingAmount: totalPrice - selectedPaymentAmount
      });
  };

  const handleNextStep = () => {
    if (formStep < 4) {
      setFormStep(formStep + 1);
      scrollToTop();
    } else {
      handleSubmitForm();
    }
  };

  const handlePreviousStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
      scrollToTop();
    }
  };

  const currentClient = formData.clients[currentClientIndex];

  

  return (
    <div className="max-w-md mx-auto p-6 bg-secondary rounded-lg shadow-lg relative">
      <button 
        onClick={() => window.history.back()}
        className="absolute left-6 top-6 text-primary hover:text-yellow-light transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Inscription - Client {currentClientIndex + 1}/{formData.numberOfPeople}
      </h2>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-yellow-light mb-2">
          <span className={formStep === 1 ? 'text-primary font-bold' : ''}>Informations Principales</span>
          <span className={formStep === 2 ? 'text-primary font-bold' : ''}>Informations Complémentaires</span>
          <span className={formStep === 3 ? 'text-primary font-bold' : ''}>Contact d'urgence</span>
          <span className={formStep === 4 ? 'text-primary font-bold' : ''}>Détails du prix</span>
        </div>
        <div className="w-full bg-dark-200 h-2 rounded-full">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${(formStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {formStep === 1 && (
        <div className="space-y-4">
          <div className="mb-6 p-4 bg-dark-300 rounded-lg border-2 border-green-500">
            <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Forfait sélectionné
            </h3>
            <div className="space-y-2">
              <p className="text-yellow-light text-lg font-semibold">
                {initialPackage?.name}
              </p>
              <p className="text-primary font-bold">{initialPackage?.price}€/personne</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-yellow-light">
                Civilité <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="title"
                    value="Mr"
                    checked={currentClient.title === 'Mr'}
                    onChange={handleChange}
                    className="form-radio text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-yellow-light">Mr</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="title"
                    value="Mme"
                    checked={currentClient.title === 'Mme'}
                    onChange={handleChange}
                    className="form-radio text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-yellow-light">Mme</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-light">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={currentClient.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow ${
                  errors.lastName ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-light">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={currentClient.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow ${
                  errors.firstName ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-light">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={currentClient.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow ${
                  errors.email ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-light">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={currentClient.phone}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow ${
                  errors.phone ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {formStep === 2 && (
        <div className="space-y-4">
          <div className="mb-6 p-4 bg-dark-300 rounded-lg border-2 border-green-500">
            <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Forfait sélectionné
            </h3>
            <div className="space-y-2">
              <p className="text-yellow-light text-lg font-semibold">
                {initialPackage?.name}
              </p>
              <p className="text-primary font-bold">{initialPackage?.price}€/personne</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-light">Date de naissance</label>
            <input
              type="date"
              name="dateOfBirth"
              value={currentClient.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-light">Nationalité</label>
            <input
              type="text"
              name="nationality"
              value={currentClient.nationality}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-light">Numéro de Passeport</label>
            <input
              type="text"
              name="passportNumber"
              value={currentClient.passportNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-light">Date d'expiration du Passeport</label>
            <input
              type="date"
              name="passportExpiry"
              value={currentClient.passportExpiry}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-light">Adresse</label>
            <input
              type="text"
              name="address"
              value={currentClient.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-yellow-light">Ville</label>
              <input
                type="text"
                name="city"
                value={currentClient.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-light">Code Postal</label>
              <input
                type="text"
                name="postalCode"
                value={currentClient.postalCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-light">Pays</label>
            <input
              type="text"
              name="country"
              value={currentClient.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
            />
          </div>
        </div>
      )}

      {formStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary mb-4">Contact d'urgence</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-yellow-light">Nom complet</label>
              <input
                type="text"
                name="emergencyContact.name"
                  value={currentClient.emergencyContact?.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-light">Téléphone</label>
              <input
                type="tel"
                name="emergencyContact.phone"
                  value={currentClient.emergencyContact?.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-light">Lien de parenté</label>
              <input
                type="text"
                name="emergencyContact.relationship"
                  value={currentClient.emergencyContact?.relationship}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-primary bg-dark-300 text-primary placeholder-yellow-light/50 focus:border-yellow focus:ring-yellow"
              />
            </div>
          </div>
        </div>
      )}

      {formStep === 4 && (
        <div className="space-y-6">
          <div className="border-t border-primary/30 pt-4">
            <div className="text-yellow-light">
              <h3 className="text-xl font-semibold text-primary mb-4">Détails du prix</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Forfait sélectionné :</p>
                    <p className="text-sm opacity-75">{initialPackage?.name}</p>
                  </div>
                  <p>{initialPackage?.price}€</p>
                </div>

                {/* Afficher les détails du forfait */}
                <div className="bg-dark-200 p-4 rounded-lg mt-4 border-2 border-green-500">
                  <p className="font-medium mb-2 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Forfait sélectionné
                  </p>
                  {initialPackage?.name && (
                    <>
                      {initialPackage.type === 'hajj' ? (
                    <>
                      {initialPackage.category === 'standard' && (
                        <p className="text-sm">Forfait Hajj Standard</p>
                      )}
                      {initialPackage.category === 'confort' && (
                        <p className="text-sm">Forfait Hajj Confort (+30%)</p>
                      )}
                      {initialPackage.category === 'premium' && (
                        <p className="text-sm">Forfait Hajj Premium (+50%)</p>
                      )}
                    </>
                  ) : (
                    <>
                          {initialPackage.category === 'standard' && (
                        <p className="text-sm">Forfait Omra Standard - 1500€</p>
                      )}
                          {initialPackage.category === 'confort' && (
                        <p className="text-sm">Forfait Omra Confort - 2000€</p>
                      )}
                          {initialPackage.category === 'premium' && (
                        <p className="text-sm">Forfait Omra Premium - 2500€</p>
                      )}
                          {initialPackage.name.includes('Ramadhan') && (
                        <p className="text-sm font-medium text-primary mt-2">Période Ramadhan</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="border-t border-primary/30 mt-4 pt-4">
                <p className="text-lg font-bold text-primary">Prix total : {totalPrice}€</p>
                </div>
              </div>

              {/* Options de paiement */}
              <div className="space-y-4">
                <h4 className="font-medium text-primary">Choisir votre option de paiement :</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {[0.25, 0.5, 0.75, 1].map((percentage) => (
                    <button
                      key={percentage}
                      type="button"
                      onClick={() => handlePaymentOption(percentage)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedPaymentAmount === totalPrice * percentage
                          ? 'bg-green-500/10 border-green-500 text-green-500'
                          : 'bg-dark-300 border-primary/30 hover:bg-dark-200'
                      }`}
                    >
                      <p className={`font-bold mb-1 ${
                        selectedPaymentAmount === totalPrice * percentage
                          ? 'text-green-500'
                          : 'text-primary'
                      }`}>
                        {percentage === 1 ? 'Paiement total' : `Acompte ${percentage * 100}%`}
                      </p>
                      <p className="text-yellow-light">{(totalPrice * percentage).toFixed(2)}€</p>
                    </button>
                  ))}
                </div>

                {selectedPaymentAmount > 0 && (
                  <div className="mt-6 p-4 bg-dark-200 rounded-lg border-2 border-green-500">
                    <p className="text-green-500 font-medium mb-2 flex items-center">
                      <span className="mr-2">✓</span>
                      Option de paiement sélectionnée
                    </p>
                    <p className="text-2xl font-bold text-primary">{selectedPaymentAmount}€</p>
                    {selectedPaymentAmount < totalPrice && (
                      <p className="text-yellow-light mt-2">
                        Reste à payer : {(totalPrice - selectedPaymentAmount).toFixed(2)}€
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-primary/30">
                      <p className="text-red-500 font-bold mb-2">Information importante :</p>
                      <p className="text-yellow-light">
                        Nous vous enverrons un lien de paiement par email et SMS dans les 48 heures.
                        Ce lien vous permettra de procéder au paiement de manière sécurisée.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {formStep > 1 && (
          <button
            type="button"
            onClick={handlePreviousStep}
            className="btn-secondary"
          >
            Retour
          </button>
        )}
        <button
          type="button"
          onClick={handleNextStep}
          className="btn-primary"
        >
          {formStep === 4 ? 'Continuer' : 'Suivant'}
        </button>
      </div>
    </div>
  );
}; 