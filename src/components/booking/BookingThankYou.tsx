import React from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

interface BookingThankYouProps {
  bookingData: {
    clients: Array<{
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
    }>;
    numberOfPeople: number;
    packageType: string;
    selectedDate: Date;
    totalPrice: number;
    paymentAmount: number;
  };
  onDownload: () => void;
  contentRef: React.RefObject<HTMLDivElement>;
}

export const BookingThankYou: React.FC<BookingThankYouProps> = ({ 
  bookingData, 
  onDownload,
  contentRef 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    scrollToTop();
    navigate('/booking');
  };

  const handleHome = () => {
    scrollToTop();
    window.location.href = '/';
  };

  return (
    <div 
      ref={contentRef}
      className="max-w-2xl mx-auto bg-dark-300 rounded-lg shadow-xl p-8 relative"
    >
      <button 
        onClick={handleBack}
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

      <div className="text-center mb-8">
        <div className="text-primary text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          Inscription Confirmée !
        </h1>
        <p className="text-yellow-light">
          Merci pour votre confiance. Voici les détails de votre inscription :
        </p>
      </div>

      {bookingData.clients.map((client, index) => (
        <div key={index} className="mb-8 border-b border-primary/30 pb-4">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Client {index + 1} sur {bookingData.numberOfPeople}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 text-yellow-light">
            <p className="font-medium">Civilité :</p>
            <p>{client.title}</p>
            
            <p className="font-medium">Nom :</p>
            <p>{client.lastName}</p>
            
            <p className="font-medium">Prénom :</p>
            <p>{client.firstName}</p>
            
            <p className="font-medium">Email :</p>
            <p>{client.email}</p>
            
            <p className="font-medium">Téléphone :</p>
            <p>{client.phone}</p>

            {client.dateOfBirth && (
              <>
                <p className="font-medium">Date de naissance :</p>
                <p>{new Date(client.dateOfBirth).toLocaleDateString('fr-FR')}</p>
              </>
            )}

            {client.nationality && (
              <>
                <p className="font-medium">Nationalité :</p>
                <p>{client.nationality}</p>
              </>
            )}

            {client.passportNumber && (
              <>
                <p className="font-medium">Numéro de passeport :</p>
                <p>{client.passportNumber}</p>
              </>
            )}

            {client.passportExpiry && (
              <>
                <p className="font-medium">Expiration du passeport :</p>
                <p>{new Date(client.passportExpiry).toLocaleDateString('fr-FR')}</p>
              </>
            )}

            {client.address && (
              <>
                <p className="font-medium">Adresse :</p>
                <p>{client.address}</p>
              </>
            )}

            {client.city && (
              <>
                <p className="font-medium">Ville :</p>
                <p>{client.city}</p>
              </>
            )}

            {client.postalCode && (
              <>
                <p className="font-medium">Code postal :</p>
                <p>{client.postalCode}</p>
              </>
            )}

            {client.country && (
              <>
                <p className="font-medium">Pays :</p>
                <p>{client.country}</p>
              </>
            )}

            {client.emergencyContact?.name && (
              <div className="col-span-2 mt-4">
                <h4 className="text-lg font-semibold text-primary mb-2">Contact d'urgence</h4>
                <div className="grid grid-cols-2 gap-4">
                  <p className="font-medium">Nom :</p>
                  <p>{client.emergencyContact.name}</p>
                  
                  {client.emergencyContact.phone && (
                    <>
                      <p className="font-medium">Téléphone :</p>
                      <p>{client.emergencyContact.phone}</p>
                    </>
                  )}
                  
                  {client.emergencyContact.relationship && (
                    <>
                      <p className="font-medium">Lien de parenté :</p>
                      <p>{client.emergencyContact.relationship}</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="border-t border-primary/30 pt-4">
        <h3 className="text-xl font-semibold text-primary mb-4">Détails du voyage</h3>
        <div className="grid grid-cols-2 gap-4 text-yellow-light">
          <p className="font-medium">Type de chambre :</p>
          <p>Chambre {bookingData.packageType}</p>
          
          <p className="font-medium">Nombre de personnes :</p>
          <p>{bookingData.numberOfPeople}</p>
          
          <p className="font-medium">Prix total :</p>
          <p className="font-bold">{bookingData.totalPrice}€</p>

          <p className="font-medium">Acompte :</p>
          <p className="font-bold text-primary">{bookingData.paymentAmount}€</p>
          
          {bookingData.paymentAmount < bookingData.totalPrice && (
            <>
              <p className="font-medium">Reste à payer :</p>
              <p className="text-yellow-light">
                {(bookingData.totalPrice - bookingData.paymentAmount).toFixed(2)}€
              </p>
            </>
          )}
        </div>

        <div className="mt-6 p-4 bg-dark-200 rounded-lg">
          <p className="text-red-500 font-bold mb-2">Information importante :</p>
          <p className="text-yellow-light">
            Nous vous enverrons un lien de paiement par email et SMS dans les 48 heures.
            Ce lien vous permettra de procéder au paiement de manière sécurisée.
          </p>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-8 action-buttons">
        <button
          onClick={onDownload}
          className="btn-primary flex items-center space-x-2"
        >
          <span>⬇️</span>
          <span>Télécharger</span>
        </button>
        <button
          onClick={handleHome}
          className="btn-secondary"
        >
          Retour à l'Accueil
        </button>
      </div>
    </div>
  );
}; 