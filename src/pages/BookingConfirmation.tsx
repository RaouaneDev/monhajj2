import React, { useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { BookingThankYou } from '../components/booking/BookingThankYou';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  let bookingData = location.state?.bookingData;
  const contentRef = useRef<HTMLDivElement>(null);

  if (!bookingData) {
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      try {
        bookingData = JSON.parse(storedData);
        sessionStorage.removeItem('bookingData');
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }
  }

  if (!bookingData) {
    return <Navigate to="/booking" replace />;
  }

  const handleDownload = async () => {
    if (contentRef.current) {
      try {
        const contentClone = contentRef.current.cloneNode(true) as HTMLElement;
        const buttons = contentClone.querySelector('.action-buttons');
        if (buttons) {
          buttons.remove();
        }

        contentClone.style.background = '#1A1A1A';
        contentClone.style.padding = '2rem';
        contentClone.style.borderRadius = '0.5rem';
        document.body.appendChild(contentClone);

        const canvas = await html2canvas(contentClone, {
          backgroundColor: '#1A1A1A',
          scale: 2,
        });

        document.body.removeChild(contentClone);

        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `reservation-${bookingData.firstName}-${bookingData.lastName}.png`;
        link.click();
      } catch (error) {
        console.error('Erreur lors de la création de l\'image:', error);
      }
    }
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container-custom py-12">
        <BookingThankYou 
          bookingData={bookingData}
          onDownload={handleDownload}
          contentRef={contentRef}
        />
      </div>
    </div>
  );
};

export default BookingConfirmation; 