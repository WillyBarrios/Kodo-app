import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a Kodo-app
      </Typography>
      <Typography variant="body1">
        Hola, {user?.email}! Aquí puedes gestionar productos, ventas, planes de pago y rutas de cobradores.
      </Typography>
    </Box>
  );
}

export default Home;