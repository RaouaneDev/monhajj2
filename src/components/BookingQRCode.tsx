import React from 'react';
import QRCode from 'react-qr-code';

const BookingQRCode: React.FC = () => {
  const bookingUrl = 'https://hajjetomra1.netlify.app/booking';

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Réservez en scannant le QR code</h2>
      <div className="p-4 bg-white rounded-lg">
        <QRCode
          value={bookingUrl}
          size={256}
          level="H"
          className="border-4 border-white"
        />
      </div>
      <p className="mt-4 text-gray-600 text-center">
        Scannez ce code QR pour accéder directement à notre page de réservation
      </p>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-blue-600 hover:text-blue-800 underline"
      >
        Ou cliquez ici pour ouvrir la page
      </a>
    </div>
  );
};

export default BookingQRCode;
