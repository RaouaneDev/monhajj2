import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentInfo = location.state;

  const handleReturnHome = () => {
    navigate('/');
  };

  const styles = {
    container: {
      paddingTop: '64px',
      paddingBottom: '64px',
    },
    paper: {
      padding: '32px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    iconBox: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    successIcon: {
      fontSize: 64,
      color: '#4CAF50',
    },
    title: {
      marginTop: '16px',
      color: '#1976d2',
      fontSize: '2rem',
      fontWeight: 600,
    },
    subtitle: {
      marginTop: '16px',
      color: '#666666',
    },
    detailsSection: {
      marginTop: '32px',
      paddingTop: '32px',
      borderTop: '1px solid #eeeeee',
    },
    detailsTitle: {
      marginBottom: '24px',
      color: '#1976d2',
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    label: {
      color: '#666666',
      fontSize: '1rem',
      fontWeight: 500,
    },
    value: {
      color: '#333333',
      marginTop: '8px',
      fontSize: '1.1rem',
    },
    infoBox: {
      marginTop: '32px',
      color: '#666666',
    },
    contactInfo: {
      marginBottom: '16px',
    },
    button: {
      marginTop: '32px',
      backgroundColor: '#1976d2',
      color: '#ffffff',
      padding: '12px 24px',
      '&:hover': {
        backgroundColor: '#1565c0',
      },
    },
    buttonBox: {
      textAlign: 'center',
    }
  };

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box sx={styles.iconBox}>
          <CheckCircleIcon sx={styles.successIcon} />
          <Typography sx={styles.title}>
            Paiement Confirmé !
          </Typography>
          <Typography sx={styles.subtitle}>
            Merci pour votre réservation. Votre voyage est maintenant confirmé.
          </Typography>
        </Box>

        {paymentInfo && (
          <Box sx={styles.detailsSection}>
            <Typography sx={styles.detailsTitle}>
              Détails du Paiement
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography sx={styles.label}>
                  Montant Total:
                </Typography>
                <Typography sx={styles.value}>
                  {paymentInfo.amount}€
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={styles.label}>
                  Acompte Payé:
                </Typography>
                <Typography sx={styles.value}>
                  {paymentInfo.deposit}€
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={styles.label}>
                  Reste à Payer:
                </Typography>
                <Typography sx={styles.value}>
                  {paymentInfo.remainingAmount}€
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={styles.label}>
                  Référence du Paiement:
                </Typography>
                <Typography sx={styles.value}>
                  {paymentInfo.paymentIntentId}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={styles.infoBox}>
          <Typography sx={styles.contactInfo}>
            Un email de confirmation a été envoyé à votre adresse email.
            Vous recevrez bientôt plus d'informations concernant votre voyage.
          </Typography>
          <Typography sx={styles.contactInfo}>
            Pour toute question, n'hésitez pas à nous contacter :
            <br />
            Email: contact@monhajj.fr
            <br />
            Téléphone: +33 6 12 34 56 78
          </Typography>
        </Box>

        <Box sx={styles.buttonBox}>
          <Button
            variant="contained"
            onClick={handleReturnHome}
            sx={styles.button}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
