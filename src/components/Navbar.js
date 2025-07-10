import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

function Navbar() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Kodo-app
        </Typography>
        {user && (
          <>
            <Button color="inherit" component={Link} to="/Products">
              Productos
            </Button>
            <Button color="inherit" component={Link} to="/Sales">
              Ventas
            </Button>
            <Button color="inherit" component={Link} to="/PaymentPlans">
              Planes de Pago
            </Button>
            <Button color="inherit" component={Link} to="/routes">
              Rutas
            </Button>
            <Button color="inherit" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;