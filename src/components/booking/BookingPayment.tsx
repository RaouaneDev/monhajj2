import React from 'react';

interface BookingPaymentProps {
  booking: any;
}

export const BookingPayment: React.FC<BookingPaymentProps> = ({ booking }) => {
  return (
    <div className="booking-payment">
      {/* Composant de paiement */}
    </div>
  );
}; 