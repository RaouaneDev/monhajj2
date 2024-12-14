import React from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';

interface BookingDetailsProps {
  booking: {
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
  onConfirm: () => void;
}

export const BookingDetails: React.FC<BookingDetailsProps> = ({ booking, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    scrollToTop();
    onConfirm();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-secondary text-primary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Résumé de la réservation</h2>
      
      <div className="bg-dark-300 p-4 rounded-lg mb-8 border border-primary/30">
        <p className="text-yellow-light text-center">
          <span className="text-primary">⚠️</span> Veuillez vérifier attentivement toutes les informations. 
          Si vous souhaitez modifier quelque chose, cliquez sur le bouton "Retour".
        </p>
        <div className="text-center mt-4">
          <button
            onClick={() => {
              scrollToTop();
              window.history.back();
            }}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
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
            <span>Retour pour modifier</span>
          </button>
        </div>
      </div>

      {booking.clients.map((client, index) => (
        <div key={index} className="mb-8 border-b border-primary/30 pb-4">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Client {index + 1} sur {booking.numberOfPeople}
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
          <p className="font-medium">Nombre de personnes :</p>
          <p>{booking.numberOfPeople}</p>
          
          <p className="font-medium">Prix total :</p>
          <p className="font-bold">{booking.totalPrice}€</p>

          <p className="font-medium">Acompte :</p>
          <p className="font-bold text-primary">{booking.paymentAmount}€</p>
          
          {booking.paymentAmount < booking.totalPrice && (
            <>
              <p className="font-medium">Reste à payer :</p>
              <p className="text-yellow-light">
                {(booking.totalPrice - booking.paymentAmount).toFixed(2)}€
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

      <div className="text-center mt-8">
        <button 
          onClick={handleConfirm}
          className="btn-primary"
        >
          Confirmer l'Inscription
        </button>
      </div>
    </div>
  );
}; 