import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeAlert, showAlert } from '../../redux/alert/alertSice';
import { URL } from '../../utils/constants';

const defaultTheme = createTheme();

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    formData: {
        password: {
        value: '',
        errorMessage: ''
      },
      email: {
        value: '',
        errorMessage: ''
      },
      name: {
        value: '',
        errorMessage: ''
      },
      age: {
        value: '',
        errorMessage: ''
      },
      lastName: {
        value: '',
        errorMessage: ''
      }
    }
  });
  const { formData } = state;
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if(Object.values(formData).find(({ errorMessage, value }) => errorMessage || !value.length)) throw new Error('Campos invalidos');
      const data = new FormData(event.currentTarget);
      const requestData = {
        email: data.get('email'),
        firstName: data.get('name'),
        lastName: data.get('lastName'),
        age: parseInt(data.get('age')),
        password: data.get('password')
      };
      await register(requestData);
      navigate('/login');
    } catch (error) {
      dispatch(showAlert({ message: error.message }));
      setTimeout(() => dispatch(closeAlert()), 2000);
    }
  };

  const register = async ({ firstName, lastName, age, email, password }) => {
    const url = `${URL}/api/user/register`;
    console.log(url)
    const loginResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        age,
        password
      })
    });
    const response = await loginResponse.json();
    if(loginResponse.status === 400)  throw new Error('Parametros invalidos');
    if(loginResponse.status === 500) throw new Error('Error en el servidor');
    if(loginResponse.status === 409) throw new Error('El usuario ya se encuentra registrado');
    if(loginResponse.status !== 200) throw new Error('Error en el servidor inesperado');
    return response;
  }

  const isValidInput = ({ target: { value, type, id, required }}, typeValidate ,size = null) => {
    try {
      if (required && !value.length) throw new Error('El campo es obligatorio');
      type = typeValidate || type;
      console.log(type)
      const validateInput = {
        email: (value) => /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(value),
        integer: (value) => /^\d+$/.test(value) ,
        text: (value) => /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]([a-zA-ZñÑáéíóúÁÉÍÓÚ ]*[a-zA-ZñÑáéíóúÁÉÍÓÚ])?$/.test(value),
      }
      const typeTranslate = {
        email: 'correo',
        integer: 'entero',
        text: 'texto sin cracteres especiales'
      }
      const validateInputFunction = validateInput[type];
      if (validateInputFunction && !validateInputFunction(value)) throw new Error(`El registro debe ser ${typeTranslate[type]}`);
      if (size && value.length < size)  throw new Error(`El largo debe ser como máximo de ${size}`);
      setState({ ...state, formData: { ...formData, [id]:{ value, errorMessage: null }}});
    } catch (error) {
      setState({ ...state, formData: { ...formData, [id]:{ value, errorMessage: error.message}}});
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs' sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 5,
            background: '#ffff',
            padding: 5
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: deepPurple[500], width: 70, height: 70 }}>
            <AccountCircleIcon sx={{ fontSize: 65 }}/>
          </Avatar>
          <Typography component='h1' variant='h5'>
            Registrar Usuario
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Direccion de Email'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
              error={!!formData.email.errorMessage}
              helperText={formData.email.errorMessage}
              onChange={event => isValidInput(event)}
              on={event => isValidInput(event)}
              onBlur={event => isValidInput(event)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Nombre'
              name='name'
              autoComplete='name'
              error={!!formData.name.errorMessage}
              helperText={formData.name.errorMessage}
              onBlur={event => isValidInput(event)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='lastName'
              label='Apellido'
              name='lastName'
              autoComplete='lastName'
              error={!!formData.lastName.errorMessage}
              helperText={formData.lastName.errorMessage}
              onChange={event => isValidInput(event)}
              onBlur={event => isValidInput(event)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='age'
              label='Edad'
              type='number'
              id='age'
              autoComplete='age'
              error={!!formData.age.errorMessage}
              helperText={formData.age.errorMessage}
              onChange={event => isValidInput(event, 'integer')}
              onBlur={event => isValidInput(event, 'integer')}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
              error={!!formData.password.errorMessage}
              helperText={formData.password.errorMessage}
              onChange={event => isValidInput(event)}
              onBlur={event => isValidInput(event)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: deepPurple[500] }}
            >
              Registrar
            </Button>
            <Grid container >
              <Grid item xs container
                direction="row"
                alignItems="center"
                justifyContent="center"
                >
                <Link href='/login' variant='body2'>
                  Volver
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}