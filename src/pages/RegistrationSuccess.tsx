import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RegistrationSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, packageDetails, roomDetails, totalPrice } = location.state || {};

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600">Aucune donnée d'inscription trouvée.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Inscription Confirmée !
          </h2>
          <p className="text-gray-600">
            Merci pour votre inscription. Nous avons bien reçu vos informations.
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Nom</p>
                <p className="font-medium">{formData.lastName}</p>
              </div>
              <div>
                <p className="text-gray-600">Prénom</p>
                <p className="font-medium">{formData.firstName}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Téléphone</p>
                <p className="font-medium">{formData.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-4">Détails du voyage</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Forfait</p>
                <p className="font-medium">{packageDetails?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Type de chambre</p>
                <p className="font-medium">{roomDetails?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Prix total estimé</p>
                <p className="font-medium">{totalPrice} €</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
              Notre équipe vous contactera prochainement pour finaliser votre réservation
              et organiser le paiement.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
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
