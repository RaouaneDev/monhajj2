import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const bookingDetails = state?.bookingDetails;

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-dark-100 rounded-lg shadow-xl p-8">
          <div className="text-center">
            <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-3xl font-bold text-yellow-light">
              Paiement Confirmé !
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              Merci pour votre réservation. Votre voyage est maintenant confirmé.
            </p>
          </div>

          {bookingDetails && (
            <div className="mt-8 border-t border-gray-700 pt-8">
              <h3 className="text-xl font-semibold text-yellow-light mb-4">
                Détails de la Réservation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <p className="font-medium">Nom:</p>
                  <p className="mt-1">{`${bookingDetails.firstName} ${bookingDetails.lastName}`}</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="mt-1">{bookingDetails.email}</p>
                </div>
                <div>
                  <p className="font-medium">Forfait:</p>
                  <p className="mt-1">{bookingDetails.package}</p>
                </div>
                <div>
                  <p className="font-medium">Type de Chambre:</p>
                  <p className="mt-1">{bookingDetails.roomType}</p>
                </div>
                <div>
                  <p className="font-medium">Montant Payé:</p>
                  <p className="mt-1">{bookingDetails.amount}€</p>
                </div>
                {bookingDetails.remainingAmount > 0 && (
                  <div>
                    <p className="font-medium">Reste à Payer:</p>
                    <p className="mt-1">{bookingDetails.remainingAmount}€</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 text-gray-300">
            <p className="mb-4">
              Un email de confirmation a été envoyé à votre adresse email.
              Vous recevrez bientôt plus d'informations concernant votre voyage.
            </p>
            <p className="mb-4">
              Pour toute question, n'hésitez pas à nous contacter :
              <br />
              Email: contact@monhajj.fr
              <br />
              Téléphone: +33 6 12 34 56 78
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleReturnHome}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-dark-100 bg-yellow-light hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
