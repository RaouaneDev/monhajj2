import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import colors from '../styles/colors';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

interface PaymentFormProps {
  amount: number;
  deposit: number;
  remainingAmount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, deposit, remainingAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [isFormComplete, setIsFormComplete] = React.useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });

  const handleCardChange = (event: any, field: string) => {
    setIsFormComplete(prev => ({
      ...prev,
      [field]: event.complete
    }));
  };

  const validateForm = () => {
    const { cardNumber, cardExpiry, cardCvc } = isFormComplete;
    if (!cardNumber || !cardExpiry || !cardCvc) {
      setError('Veuillez remplir tous les champs de la carte bancaire correctement.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        setError('Erreur: Impossible de traiter le paiement');
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message || 'Une erreur est survenue');
        return;
      }

      // Ici, vous pouvez appeler votre API backend avec paymentMethod.id
      console.log('Payment Method:', paymentMethod);
      
      // Rediriger vers une page de confirmation
      navigate('/payment-success');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Détails du paiement
        </Typography>
        <Typography variant="body1" gutterBottom>
          Montant total : {amount}€
        </Typography>
        <Typography variant="body1" gutterBottom>
          Acompte à payer maintenant : {deposit}€
        </Typography>
        <Typography variant="body1" gutterBottom>
          Reste à payer : {remainingAmount}€
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Numéro de carte
        </Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 2 }}
        >
          <CardNumberElement options={cardStyle} onChange={(e) => handleCardChange(e, 'cardNumber')} />
        </Paper>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" gutterBottom>
              Date d'expiration
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <CardExpiryElement options={cardStyle} onChange={(e) => handleCardChange(e, 'cardExpiry')} />
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" gutterBottom>
              CVC
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <CardCvcElement options={cardStyle} onChange={(e) => handleCardChange(e, 'cardCvc')} />
            </Paper>
          </Box>
        </Box>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={processing || !stripe}
        sx={{
          mt: 3,
          backgroundColor: colors.primary,
          '&:hover': {
            backgroundColor: colors.primaryDark,
          },
        }}
      >
        {processing ? 'Traitement...' : 'Payer maintenant'}
      </Button>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const { amount, deposit, remainingAmount } = location.state || {
    amount: 0,
    deposit: 0,
    remainingAmount: 0
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Elements stripe={stripePromise}>
        <PaymentForm 
          amount={amount}
          deposit={deposit}
          remainingAmount={remainingAmount}
        />
      </Elements>
    </Container>
  );
};

export default Payment;
