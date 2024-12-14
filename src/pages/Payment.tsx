import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';
import colors from '../styles/colors';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

const PaymentForm = ({ amount, deposit, remainingAmount }: { 
  amount: number;
  deposit: number;
  remainingAmount: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe ou Elements non disponible');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Stocker les informations de paiement
        localStorage.setItem('paymentInfo', JSON.stringify({
          paymentIntentId: paymentIntent.id,
          amount,
          deposit,
          remainingAmount,
          timestamp: new Date().toISOString()
        }));

        navigate('/payment-success', {
          state: {
            paymentIntentId: paymentIntent.id,
            amount,
            deposit,
            remainingAmount
          }
        });
      }
    } catch (err: any) {
      console.error('Erreur de paiement:', err);
      setError(err.message || 'Une erreur est survenue lors du paiement');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: colors.text.primary }}>
          Détails du paiement
        </Typography>
        <Typography sx={{ mb: 1, color: colors.text.secondary }}>
          Montant total : {amount}€
        </Typography>
        <Typography sx={{ mb: 1, color: colors.text.secondary }}>
          Acompte à payer : {deposit}€
        </Typography>
        <Typography sx={{ mb: 3, color: colors.text.secondary }}>
          Reste à payer : {remainingAmount}€
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <PaymentElement />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={processing || !stripe}
        sx={{
          bgcolor: colors.primary,
          color: colors.background.default,
          '&:hover': {
            bgcolor: colors.primaryDark,
          },
          height: 48,
        }}
      >
        {processing ? (
          <CircularProgress size={24} sx={{ color: colors.background.default }} />
        ) : (
          `Payer ${deposit}€`
        )}
      </Button>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const { amount, deposit, remainingAmount } = location.state || {};
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!amount || !deposit || remainingAmount === undefined) {
      return;
    }

    // Créer le Payment Intent au chargement
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('https://monhajj2backend.onrender.com/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: deposit,
            currency: 'eur',
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de la création du payment intent');
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Erreur:', err);
      }
    };

    createPaymentIntent();
  }, [amount, deposit, remainingAmount]);

  if (!amount || !deposit || remainingAmount === undefined) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error">
          Informations de paiement manquantes
        </Typography>
      </Container>
    );
  }

  if (!clientSecret) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm
            amount={amount}
            deposit={deposit}
            remainingAmount={remainingAmount}
          />
        </Elements>
      </Box>
    </Container>
  );
};

export default Payment;
