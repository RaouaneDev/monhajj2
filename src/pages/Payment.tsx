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
import { Box, Typography, Button, Container, Paper, CircularProgress } from '@mui/material';
import colors from '../styles/colors';

// S'assurer que la clé publique est bien définie
const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
console.log('Stripe Public Key:', stripeKey); // Debug log

if (!stripeKey) {
  throw new Error('La clé publique Stripe n\'est pas définie dans les variables d\'environnement');
}

const stripePromise = loadStripe(stripeKey);

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
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [isFormComplete, setIsFormComplete] = React.useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });

  React.useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        console.log('Création du Payment Intent pour le montant:', deposit); // Debug log
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
        console.log('Réponse du serveur:', data); // Debug log

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors de la création du payment intent');
        }

        setClientSecret(data.clientSecret);
      } catch (err: any) {
        console.error('Erreur lors de la création du Payment Intent:', err); // Debug log
        setError(err.message);
      }
    };

    if (deposit > 0) {
      createPaymentIntent();
    }
  }, [deposit]);

  const handleCardChange = (event: any, field: string) => {
    console.log(`Changement du champ ${field}:`, event.complete); // Debug log
    setIsFormComplete(prev => ({
      ...prev,
      [field]: event.complete
    }));
  };

  const validateForm = () => {
    const { cardNumber, cardExpiry, cardCvc } = isFormComplete;
    console.log('Validation du formulaire:', { cardNumber, cardExpiry, cardCvc }); // Debug log
    if (!cardNumber || !cardExpiry || !cardCvc) {
      setError('Veuillez remplir tous les champs de la carte bancaire correctement.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Soumission du formulaire...'); // Debug log

    if (!stripe || !elements || !clientSecret) {
      console.error('Stripe ou elements ou clientSecret non disponible:', { 
        stripeAvailable: !!stripe,
        elementsAvailable: !!elements,
        clientSecretAvailable: !!clientSecret
      }); // Debug log
      return;
    }

    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        throw new Error('Erreur: Impossible de traiter le paiement');
      }

      console.log('Confirmation du paiement avec clientSecret:', clientSecret); // Debug log
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              // Vous pouvez ajouter des détails de facturation ici si nécessaire
            },
          },
        }
      );

      if (confirmError) {
        console.error('Erreur de confirmation:', confirmError); // Debug log
        throw new Error(confirmError.message);
      }

      console.log('Résultat du paiement:', paymentIntent); // Debug log

      if (paymentIntent.status === 'succeeded') {
        // Stocker les informations de paiement dans le localStorage
        const paymentInfo = {
          paymentIntentId: paymentIntent.id,
          amount: amount,
          deposit: deposit,
          remainingAmount: remainingAmount,
          timestamp: new Date().toISOString()
        };
        console.log('Stockage des informations de paiement:', paymentInfo); // Debug log
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

        // Rediriger vers la page de succès
        navigate('/payment-success', {
          state: {
            paymentIntentId: paymentIntent.id,
            amount: amount,
            deposit: deposit,
            remainingAmount: remainingAmount
          }
        });
      } else {
        console.error('Le paiement n\'a pas réussi:', paymentIntent.status); // Debug log
        throw new Error('Le paiement n\'a pas été complété avec succès');
      }
    } catch (err: any) {
      console.error('Erreur lors du paiement:', err); // Debug log
      setError(err.message || 'Une erreur est survenue lors du paiement');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: colors.text.primary, mb: 1 }}>
          Informations de paiement
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
          Montant total: {amount}€
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
          Acompte à payer maintenant: {deposit}€
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
          Reste à payer plus tard: {remainingAmount}€
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: colors.text.primary }}>
          Numéro de carte
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: colors.background.paper,
            border: `1px solid ${colors.gray.main}`,
          }}
        >
          <CardNumberElement
            onChange={(e) => handleCardChange(e, 'cardNumber')}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: colors.text.primary,
                  '::placeholder': {
                    color: colors.text.disabled,
                  },
                },
              },
            }}
          />
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: colors.text.primary }}>
            Date d'expiration
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: colors.background.paper,
              border: `1px solid ${colors.gray.main}`,
            }}
          >
            <CardExpiryElement
              onChange={(e) => handleCardChange(e, 'cardExpiry')}
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: colors.text.primary,
                    '::placeholder': {
                      color: colors.text.disabled,
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: colors.text.primary }}>
            CVC
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: colors.background.paper,
              border: `1px solid ${colors.gray.main}`,
            }}
          >
            <CardCvcElement
              onChange={(e) => handleCardChange(e, 'cardCvc')}
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: colors.text.primary,
                    '::placeholder': {
                      color: colors.text.disabled,
                    },
                  },
                },
              }}
            />
          </Paper>
        </Box>
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
        disabled={processing || !clientSecret}
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
    </Box>
  );
};

const Payment: React.FC = () => {
  const location = useLocation();
  const { amount, deposit, remainingAmount } = location.state || {};

  console.log('État initial du paiement:', { amount, deposit, remainingAmount }); // Debug log

  if (!amount || !deposit || remainingAmount === undefined) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error">
          Informations de paiement manquantes
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Elements stripe={stripePromise}>
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
