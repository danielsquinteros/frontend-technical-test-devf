import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import { AuthContext } from '../Context/AuthContext';
import { getUserId } from '../Services/userService';


function NavbarView({children}) {
  const {clearToken, userId} = useContext(AuthContext)




  return (
        <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            DEV.F Cases - Hola { userId.id }
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/users"
              sx={{ my: 1, mx: 1.5 }}
            >
              Usuarios
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/cases"
              sx={{ my: 1, mx: 1.5 }}
            >
              Casos
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/types"
              sx={{ my: 1, mx: 1.5 }}
            >
              Tipos de Casos
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/status"
              sx={{ my: 1, mx: 1.5 }}
            >
              Estados de Casos
            </Link>
          </nav>
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={clearToken}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Container fullWidth component="main" sx={{ pt: 8, pb: 6 }}>
          {children}
    </Container>
      </>
  );
}

export default NavbarView
