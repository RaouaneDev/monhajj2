import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import colors from '../styles/colors';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentInfo = location.state;

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: colors.background.paper }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: colors.state.success }} />
          <Typography variant="h4" sx={{ mt: 2, color: colors.primary }}>
            Paiement Confirmé !
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: colors.text.secondary }}>
            Merci pour votre réservation. Votre voyage est maintenant confirmé.
          </Typography>
        </Box>

        {paymentInfo && (
          <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: colors.gray.main }}>
            <Typography variant="h5" sx={{ mb: 3, color: colors.primary }}>
              Détails du Paiement
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ color: colors.text.secondary }}>
                  Montant Total:
                </Typography>
                <Typography variant="body1" sx={{ color: colors.text.primary, mt: 1 }}>
                  {paymentInfo.amount}€
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ color: colors.text.secondary }}>
                  Acompte Payé:
                </Typography>
                <Typography variant="body1" sx={{ color: colors.text.primary, mt: 1 }}>
                  {paymentInfo.deposit}€
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ color: colors.text.secondary }}>
                  Reste à Payer:
                </Typography>
                <Typography variant="body1" sx={{ color: colors.text.primary, mt: 1 }}>
                  {paymentInfo.remainingAmount}€
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ color: colors.text.secondary }}>
                  Référence du Paiement:
                </Typography>
                <Typography variant="body1" sx={{ color: colors.text.primary, mt: 1 }}>
                  {paymentInfo.paymentIntentId}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={{ mt: 4, color: colors.text.secondary }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Un email de confirmation a été envoyé à votre adresse email.
            Vous recevrez bientôt plus d'informations concernant votre voyage.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Pour toute question, n'hésitez pas à nous contacter :
            <br />
            Email: contact@monhajj.fr
            <br />
            Téléphone: +33 6 12 34 56 78
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleReturnHome}
            sx={{
              bgcolor: colors.primary,
              color: colors.background.default,
              '&:hover': {
                bgcolor: colors.primaryDark,
              },
            }}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
