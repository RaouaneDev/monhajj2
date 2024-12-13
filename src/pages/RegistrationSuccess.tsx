import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const RegistrationSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, packageDetails, roomDetails, totalPrice, numberOfPersons, paymentCompleted } = location.state || {};

  if (!formData || !packageDetails || !roomDetails) {
    return <Navigate to="/booking" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {paymentCompleted ? 'Paiement effectué avec succès !' : 'Réservation enregistrée avec succès !'}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              {paymentCompleted 
                ? 'Votre paiement a été traité et votre réservation est confirmée.'
                : `Nous vous contacterons bientôt au ${formData.phone} pour finaliser votre réservation.`
              }
            </p>
            <p className="text-sm text-gray-500">
              {paymentCompleted 
                ? 'Un email de confirmation vous sera envoyé dans les prochaines minutes.'
                : 'Veuillez garder votre téléphone à proximité.'
              }
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 my-6">
            <h3 className="text-xl font-semibold mb-4">Détails de la réservation</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Forfait</dt>
                <dd className="mt-1 text-lg text-gray-900">{packageDetails.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Type de chambre</dt>
                <dd className="mt-1 text-lg text-gray-900">{roomDetails.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Nombre de personnes</dt>
                <dd className="mt-1 text-lg text-gray-900">{numberOfPersons} {numberOfPersons === 1 ? 'personne' : 'personnes'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Prix total</dt>
                <dd className="mt-1 text-lg text-gray-900">{totalPrice.toLocaleString()}€</dd>
              </div>
            </dl>
          </div>

          <div className="border-b border-gray-200 py-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Vos informations</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd className="mt-1 text-lg text-gray-900">{formData.firstName} {formData.lastName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-lg text-gray-900">{formData.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                <dd className="mt-1 text-lg text-gray-900">{formData.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Nationalité</dt>
                <dd className="mt-1 text-lg text-gray-900">{formData.nationality}</dd>
              </div>
            </dl>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => navigate('/'), 500);
              }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
