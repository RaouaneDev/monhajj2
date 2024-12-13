// Configuration Stripe
export const STRIPE_PUBLIC_KEY = 'pk_test_51OgnMoHyjf3wZJG1uTOUqnHHMyb0HEKodOCnifzyH06O9G4HiYTkq0WRINguLov7UDticCCG9hET57OBCHXXdCKF00bfLWLl3w';
export const STRIPE_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://monhajj2backend.onrender.com'  // URL de votre backend sur Render
  : 'http://localhost:3001';
