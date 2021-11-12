import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import { AuthContext } from '../Context/AuthContext';

function NavbarView({children}) {
  const {clearToken, userInfo} = useContext(AuthContext)

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
            DEV.F Cases - Hola { userInfo.id}
          </Typography>
          <nav>
            <Link to="/cases" style={{ textDecoration: 'none', marginRight: '5px'}}>
              <Button variant="text"  color="primary">
                Casos
                </Button>
            </Link> 
            
            { userInfo.role === 'ADMIN_ROLE' && 
              <Link to="/users" style={{ textDecoration: 'none', marginRight: '5px'}}> 
                  <Button variant="text" color="primary">
                    Usuarios
                  </Button>
              </Link> 
            }

            { userInfo.role === 'ADMIN_ROLE' && 
              <Link to="/types" style={{ textDecoration: 'none', marginRight: '5px'}}> 
                <Button variant="text"  color="primary">
                  Tipos de Casos
                </Button>
              </Link> 
            }
            { userInfo.role === 'ADMIN_ROLE' && 
              <Link to="/status" style={{ textDecoration: 'none', marginRight: '5px'}}>
                <Button variant="text" >
                  Estados de Casos
                </Button>
              </Link> 
            }
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
