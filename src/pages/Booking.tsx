import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../components/booking/BookingForm';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { BookingDetails } from '../components/booking/BookingDetails';
import { scrollToTop } from '../utils/scrollUtils';

interface Package {
  id: string;
  type: 'hajj' | 'omra';
  name: string;
  date: Date;
  price: number;
  category: 'standard' | 'confort' | 'premium';
}

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

interface BookingData {
  clients: ClientInfo[];
  numberOfPeople: number;
  packageType: string;
  selectedDate: Date;
  totalPrice: number;
  paymentAmount: number;
}

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
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
    packageType: '',
    selectedDate: new Date(),
    totalPrice: 0,
    paymentAmount: 0
  });

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setBookingData(prev => ({
      ...prev,
      packageType: pkg.id,
      selectedDate: pkg.date,
      totalPrice: pkg.price
    }));
    setCurrentStep(2);
  };

  const handleBookingSubmit = (data: BookingData) => {
    const updatedData = {
      ...data,
      totalPrice: selectedPackage ? selectedPackage.price : 0,
      paymentAmount: data.paymentAmount
    };
    setBookingData(updatedData);
    setCurrentStep(3);
  };

  const handleConfirmation = () => {
    const finalData = {
      ...bookingData,
      paymentAmount: bookingData.paymentAmount
    };
    
    scrollToTop();
    navigate('/booking-confirmation', { 
      state: { 
        bookingData: finalData
      } 
    });
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container-custom py-12">
        {currentStep === 1 && (
          <BookingCalendar onSelect={handlePackageSelect} />
        )}
        {currentStep === 2 && (
          <BookingForm 
            onSubmit={handleBookingSubmit}
            initialPackage={selectedPackage}
          />
        )}
        {currentStep === 3 && (
          <div>
            <BookingDetails 
              booking={bookingData} 
              onConfirm={handleConfirmation} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
