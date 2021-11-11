import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {Avatar, Button, Alert, AlertTitle, Collapse} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import TextField from '../Components/Atoms/TextField';
import loginService from '../Services/loginServices'
import logo from '../assets/images/logo_devf.png'
import { AuthContext } from '../Context/AuthContext';

const theme = createTheme({
});

const INITIAL_FORM_STATE = {
    email: '',
    password: '',
}

const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email.').required('Required'),
    password: Yup.string().required('Required'),
})

const Login = () =>  {
    const { saveToken } = useContext(AuthContext)
    const [errorApi, setErrorApi] = useState({msg:'', status: false})
    const [successApi, setSuccessApi] = useState({msg:'', status: false})
    
    let navigate = useNavigate();




    const submitLogin = async (values) => {
        try {
            const response = await loginService(values.email, values.password)
            if(response.status === 200){
                saveToken(response.data.token)
                setErrorApi({msg:'', status: false})
                setSuccessApi({msg:'Sesión iniciada correctamente', status: true})
                navigate('/cases')
            }
        } catch (error) {
            setSuccessApi({msg:'', status: false})
            setErrorApi({msg:error.msg, status: true})
        }
    }


  return (
    <ThemeProvider theme={theme}>
      <Container sx={{
          
            display: "flex",
            direction:"column",
            alignItems:"center",
            justifyContent:"center",
            minHeight: '100vh' }}
      >
        <Box
          sx={{
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "500px",
          }}
        >
          <Avatar  variant="square"  alt="Logo DEV.F" src={logo}  sx={{ m: 1, width: 100, height: 100  }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={submitLogin}
            >
            <Box component={Form}  sx={{ mt: 5 }}>
                <TextField 
                    name="email"
                    label="Email"
                    sx={{ mt: 1, mb: 1 }}
                    />
                <TextField 
                    name="password"
                    label="Password"
                    sx={{ mt: 1, mb: 1 }}
                />
                <Button
                   color="secondary"
                    size="large"
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                >
                Iniciar Sesión
                </Button>
                <Collapse in={errorApi.status}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorApi.msg}
                    </Alert>
                </Collapse>
                <Collapse in={successApi.status}>
                    <Alert severity="success">
                        <AlertTitle>Éxito</AlertTitle>
                        {successApi.msg}
                    </Alert>
                </Collapse>
            </Box>
            </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;